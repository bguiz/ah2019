const Web3 = require('web3');

const abi = require('./interface.js');

const provider = 'http://nd-670-846-364.rg-837-380.int.chainstack.com:8545'
const web3 = new Web3(new Web3.providers.HttpProvider(provider), null, {
  transactionConfirmationBlocks: 1,
});
const contract = web3.eth.Contract(abi, '0x66b48b2c56Ee4e7f28Ff23CDCfe4Ab7dE9924413');

async function getAccount() {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
}

module.exports = {
  provider,
  web3,
  contract,
  getAccount,
};
