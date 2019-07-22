const dotenv = require('dotenv');
const Web3 = require('web3');
dotenv.config();

const web3 = new Web3(
  new Web3.providers.HttpProvider('http://nd-959-117-562.rg-837-380.p2pify.com:8545'),
  null,
  {
    transactionConfirmationBlocks: 1,
  },
);

function getAddress() {
  return web3.eth.getAccounts().then(accounts => accounts[0]);
}

async function deployContract(contractData,title) {
  const address = await getAddress(web3);
  const contract = new web3.eth.Contract(contractData.interface);
  return contract
    .deploy({
      data: contractData.bytecode,
      arguments:[title],
    })
    .send({
      from: address,
      gas: 470000000,
      gasPrice: 0,
    })
    .on('error', console.error)
    .then(contractInstance => {
      return contractInstance;
    });
}

async function deployTracker(interface,bytecode) {
  const address = await getAddress(web3)
  const contract = new web3.eth.Contract(interface)
  return contract
    .deploy({
      data: bytecode,
    })
    .send({
      from: address,
      gas: 470000000,
      gasPrice: 0,
    })
    .on('error', console.error)
    .then(contractInstance => {
      return contractInstance.options.address;
    });
}

async function getTracker(interface,bytecode,TrackerAddress) {
  const address = await getAddress(web3)
  const contract = new web3.eth.Contract(interface,TrackerAddress);
  return contract
}
module.exports = {
  getAddress,
  deployContract,
  deployTracker,
  getTracker
}
