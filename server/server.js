const express = require('express');
const bodyParser = require('body-parser');

const web3 = require('./web3.js');
const { ipfsWriteObject, ipfsReadObject } = require('./ipfs.js');

const server = new express();
const port = 3333;

server.use(bodyParser.json());
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
server.post('/addSurvey', async (req, res) => {
  console.log('/addSurvey', req.body);

  try {
    const { survey } = req.body;
    const address = await web3.getAccount();
    JSON.stringify(survey);

    const ipfsHash = await ipfsWriteObject(survey);

    const estimatedGas = await web3.contract.methods.addSurvey(ipfsHash).estimateGas({
      from: address,
    });

    const receipt = await web3.contract.methods.addSurvey(ipfsHash).send({
      from: address,
      gas: estimatedGas * 2, // quorum uses a bit extra
    });

    res.send({
      receipt,
    });
  } catch (ex) {
    res.status(500).send(ex.toString());
    console.error(ex);
  }
});

server.post('/getSurvey', async (req, res) => {
  console.log('/getSurvey', req.body);

  try {
    const { surveyId } = req.body;

    console.log(req.body);
    const address = await web3.getAccount();

    const ipfsHash = await web3.contract.methods.surveys(surveyId).call({
      from: address,
    });

    if (!ipfsHash) {
      res.status(404).send(`Survey does not exist: ${surveyId}`);
    } else {
      const ipfsData = await ipfsReadObject(ipfsHash);
      // console.log(ipfsData)
      res.send({
        survey: ipfsData,
      });
    }
  } catch (ex) {
    res.status(500).send(ex.toString());
    console.error(ex);
  }
});

server.post('/answerSurvey', async (req, res) => {
  console.log('/answerSurvey', req.body);

  try {
    const { surveyId, userId, answers } = req.body;

    const address = await web3.getAccount();

    const ipfsHash = await web3.contract.methods.surveys(surveyId).call({
      from: address,
    });

    if (!ipfsHash) {
      res.status(404).send(`Survey does not exist: ${surveyId}`);
      return;
    }

    const survey = await ipfsReadObject(ipfsHash);

    if (survey.questions.length !== answers.length) {
      res
        .status(400)
        .send(
          `Survey must have the same number of answers as there are questions: answers ${answers.length} questions ${
            survey.questions.length
          }`,
        );
      return;
    }
    for (let i = 0; i < answers.length; ++i) {
      if (answers[i] < 0 || answers[i] > 3) {
        res.status(400).send(`Illegal answer value for question: question number ${i} answer ${answers[i]}`);
        return;
      }
    }

    const estimatedGas = await web3.contract.methods.answerSurvey(surveyId, userId, answers).estimateGas({
      from: address,
    });

    const receipt = await web3.contract.methods.answerSurvey(surveyId, userId, answers).send({
      from: address,
      gas: estimatedGas * 2, // quorum uses a bit extra
    });

    res.send({
      receipt,
    });
  } catch (ex) {
    res.status(500).send(ex.toString());
    console.error(ex);
  }
});

server.post('/getResults', async (req, res) => {
  console.log('/getResults', req.body);

  try {
    const { surveyId } = req.body;
    const address = await web3.getAccount();

    const ipfsHash = await web3.contract.methods.surveys(surveyId).call({
      from: address,
    });

    if (!ipfsHash) {
      res.status(404).send(`Survey does not exist: ${surveyId}`);
      return;
    }

    const survey = await ipfsReadObject(ipfsHash);
    console.log(survey);

    const questions = [...survey.questions];
    const numQuestions = questions.length;

    const results = await web3.contract.methods.aggregateSurvey(surveyId, numQuestions).call({
      from: address,
    });
    const numbers = results.map(bn => bn.toNumber());

    for (let i = 0; i < numQuestions; i++) {
      const answerCounts = [numbers[i * 4 + 0], numbers[i * 4 + 1], numbers[i * 4 + 2], numbers[i * 4 + 3]];
      const question = {
        ...questions[i],
        answerCounts,
      };
      questions[i] = question;
    }

    const updatedSurvey = {
      ...survey,
      questions,
    };

    res.send({
      survey: updatedSurvey,
    });
  } catch (ex) {
    res.status(500).send(ex.toString());
    console.error(ex);
  }
});

server.listen(port);
console.log(`Listening on http://127.0.0.1:${port}`);
