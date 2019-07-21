const dotenv = require('dotenv');
const Web3 = require('web3');
const { compileContract } = require('./utils/compiler.js');
const { toBytes, toJson, getContract } = require('./utils/formatter.js');

dotenv.config();

const node1 = new Web3(
  new Web3.providers.HttpProvider(process.env.RPC1),
  null,
  {
    transactionConfirmationBlocks: 1,
  },
);

let contractData = {};

const main = async () => {
  contractData = compileContract('survey.sol');

  const response = await contractGet(node1);
};

async function contractSet(web3) {
  const myContract = await getContract(web3, contractData, process.env.ContractAddress);

  return myContract.methods
    .createSurvey('Wahahahahahahaha')
    .send({})
    .then(receipt => {
      console.log(receipt);

      return receipt.status;
    });
}

async function contractGet(web3) {
  const myContract = await getContract(web3, contractData, process.env.ContractAddress);

  return myContract.methods
    .getSurvey()
    .call()
    .then(result => {
      console.log(result);

      return result;
    });
}

main();
