<template lang="pug">
  v-app
    v-toolbar(app='')
      v-toolbar-title.headline.text-uppercase
        span Vuetify
        span.font-weight-light MATERIAL DESIGN
      v-spacer
      v-btn(flat='', href='https://github.com/vuetifyjs/vuetify/releases/latest', target='_blank')
        span.mr-2 Latest Release
    v-content
      survey
    v-snackbar(v-model='snackbar') {{ snackMsg }}
      v-btn(color='pink', flat='', @click='snackbar = false')
        | Close
</template>

<script>
import Survey from './components/Survey.vue';

export default {
  name: 'App',
  components: {
    Survey,
  },
  data() {
    return {
      snackbar: false,
      snackMsg: 'oh no, something seems wrong',
    };
  },
  methods: {
    showSnack(msg) {
      this.snackMsg = msg;
      this.snackbar = true;
    },
  },
  created() {
    this.$eventHub.$on('showSnack', this.showSnack);
  },
  destroyed() {
    this.$eventHub.$off('showSnack');
  },
};
</script>
