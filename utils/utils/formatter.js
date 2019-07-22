const dotenv = require('dotenv');
dotenv.config();

const jsonToBytes = (web3, jsonObj) => {
  const hex = web3.utils.toHex(JSON.stringify(jsonObj));

  return web3.utils.hexToBytes(hex);
};

const bytesToJson = (web3, bytesArray) => {
  const hex = web3.utils.bytesToHex(bytesArray);

  return JSON.parse(node.utils.hexToUtf8(hex));
};

const stringToBytes32 = (web3, stringArray) => {
 stringArray.forEach((item,i) => {
  stringArray[i] = web3.utils.fromAscii(item);
 });

 return stringArray
}

const getDefaultAddress = (web3) => {
  return web3.eth.getAccounts().then(accounts => accounts[0]);
}

const getContract = async (web3, contractData, ContractAddress) => {
  const address = await getDefaultAddress(web3);

  return web3.eth.Contract(
    contractData.interface,
    ContractAddress,
    {
      defaultAccount: address,
    },
  );
}

module.exports = {
  getDefaultAddress,
  getContract,
  stringToBytes32,
  jsonToBytes,
  bytesToJson,
};
