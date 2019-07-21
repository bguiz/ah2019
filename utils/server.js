const {getAddress,deployContract,deployTracker,getTracker} = require('./deploy.js')
const {compileContract} = require('./utils/compiler.js');
const {interface,bytecode} = require('./utils/reference.js')

const fs = require('fs-extra')
const Web3 = require('web3');

const express = require('express');
const bodyParser = require('body-parser');
const server = new express();
const port = 3334;

/**
@notice This is the defeault tracker address
@dev If you create a new Tracker, this is automatically updated.
**/
const TrackerAddresses = JSON.parse(fs.readFileSync('./utils/trackers.json'))
server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/**
@notice Creates a new tracker contract
@dev Call this ONLY when u want to create a new tracker contract. Be sure to update the address
@dev all trackers are stored in the trackers.json file
**/
server.get('/createTracker',async(req,res) => {
	deployTracker(interface,bytecode).then((address) => {
		TrackerAddresses.push(address)
		json = JSON.stringify(TrackerAddresses)
		fs.writeFile('./utils/trackers.json',json,'utf8',(err,data) => {
			if(err) {
				console.log("Failed to write new tracker to trackers.json")
			}else {
				console.log(`Sucesfully saved new tracker address: ${address}`)
				res.send(TrackerAddresses.last())
				res.end()
			}
		})
		
	})
})


server.get('/getSurveyIds',async(req,res) => {
	const trackerContract = await getTracker(interface,bytecode,TrackerAddresses.last())
	trackerContract.methods.getSurveyIds().call({
	}).then((result) => {
		res.send(result)
	})
})


server.post('/newSurvey',async(req,res) => {
	try {
		const survey = req.body
		const title = survey.title;
		const question = survey.question;
		const promiseArray =[
						deployContract(compileContract('survey.sol'),title,question),
						getAddress(),
						getTracker(interface,bytecode,TrackerAddresses.last()),
						]
		Promise.all(promiseArray).then((result) => {
			trackerContract = result[2]
			surveyContractAddress = result[0]
			currentAccount = result[1]
			trackerContract.methods.addSurvey(surveyContractAddress).send({
				from:currentAccount
			}).then((result) => {
				res.send("Survey Succesfully added to tracker")
				res.status(200)
				res.end()
			})
		})
	} catch(ex) {
		res.status(500).send(ex.toString())
		console.log(ex.toString())
	}
	

})
/**
@notice Get the Survey title
@dev Body is the ADDRESS of the survey contract. You NEED to know the survey contract address.
@dev otherwise, just use /getAllSurveys. This method should NEVER be used except for debugging
**/
server.post('/getSurveyTitle',async(req,res) => {
	try {
		const survey = req.body
		const surveyAddress = survey.address.toString();
		const trackerContract = await getTracker(interface,bytecode,TrackerAddresses.last());
		trackerContract.methods.getSurveyTitleByAddress(surveyAddress).call({}).then((result) => {
			res.send(result)
			res.end()
		})
	}catch(ex) {
		res.status(400).send(ex.toString())
		console.log(ex.toString())
	}
})

/**
@notice Get list of surveys titles + address
@dev Get the list of surveys with title so that you can populate the front end
@dev returns an array
**/
server.get('/getAllSurveys',async(req,res) => {
	try {
		const promiseArray = []
		const trackerContract = await getTracker(interface,bytecode,TrackerAddresses.last());
		const ids = await trackerContract.methods.getSurveyIds().call({})
		ids.forEach((item) => {
			console.log(item)
			promiseArray.push(trackerContract.methods.getSurveyTitleById(item).call({}))
		})
		Promise.all(promiseArray).then((result) => {
			res.send(result)
		})
	} catch(ex) {
		res.status(500).send(ex.toString())
		console.log(ex.toString())
	}
})


/**
@notice Test function for express post
@dev
**/
server.post('/post',async(req,res) => {
	try {
		console.log('receiving request')
		res.send(req.body)
	}catch {
		res.status(400)
	}
})

/**
@notice Helper function to get last Array
@dev
**/
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

server.listen(3333);
console.log("listening on: " + '127.0.0.1:3333')