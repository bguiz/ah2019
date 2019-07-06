<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import {
  ipfs,
  ipfsReadObject,
  ipfsWriteObject,
} from './../ipfs.js';

export default {
  async created() {
    console.log(ipfs);

    const ipfsHash = await ipfsWriteObject({ test: 1, time: Date.now() });
    console.log('wrote to ipfs', ipfsHash);

    const ipfsObject = await ipfsReadObject(ipfsHash);
    console.log('read from ipfs', ipfsObject);
  },
}
</script>
