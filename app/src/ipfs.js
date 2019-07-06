import ipfsApi from 'ipfs-api';

const localIpfsConnection = {
  host: 'localhost',
  port: 5001,
  protocol: 'http',
};

const infuraIpfsConnection = {
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
};

const ipfs = new ipfsApi(
  localIpfsConnection, // to connect to your local IPFS node
  // infuraIpfsConnection, // to connect to Infura's IPFS node
);

async function ipfsWriteObject(object) {
  // write to IPFS and obtain its hash
  // ref: https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#add
  const buffer = await Buffer.from(JSON.stringify(object, undefined, 2));
  const ipfsResult = await ipfs.add(buffer);
  return ipfsResult[0].hash;
}

async function ipfsReadObject(ipfsHash) {
  const ipfsFileBuffer = await ipfs.cat(`/ipfs/${ipfsHash}`);
  const data = ipfsFileBuffer.toString();
  return JSON.parse(data);
}

export {
  ipfs,
  ipfsWriteObject,
  ipfsReadObject,
};
