<template lang="pug">
v-container
  v-layout(text-xs-center='', wrap='')
    v-flex(xs12='')
      v-img.my-3(:src="require('../assets/logo.svg')", contain='', height='200')
    v-flex(mb-4='')
      h1.display-2.font-weight-bold.mb-3
      p.subheading.font-weight-regular
        | For help and collaboration with other Vuetify developers,
        br
        | please join our online
        a(href='https://community.vuetifyjs.com', target='_blank') Discord Community

</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style></style>
