const express = require('express');
const bodyParser = require('body-parser');

const web3 = require('./web3.js');
const {
  ipfsWriteObject,
  ipfsReadObject,
} = require('./ipfs.js');

const server = new express();
const port = 3333;

server.use(bodyParser.json());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.post('/addSurvey', async (req, res) => {
  console.log('/addSurvey', req.body);

  try {
    const {
      survey,
    } = req.body;
    const address = await web3.getAccount();
    JSON.stringify(survey);

    const ipfsHash = await ipfsWriteObject(survey);

    const estimatedGas = await web3.contract.methods.addSurvey(ipfsHash).estimateGas({
      from: address,
    });

    const receipt = await web3.contract.methods
      .addSurvey(ipfsHash)
      .send({
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
    const {
      surveyId,
    } = req.body;
    const address = await web3.getAccount();

    const ipfsHash = await web3.contract.methods
      .surveys(surveyId)
      .call({
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

server.listen(port);
console.log(`Listening on http://127.0.0.1:${port}`);
