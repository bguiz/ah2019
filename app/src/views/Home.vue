<template lang="pug">
  v-layout(row wrap)
    v-btn(:to="{ name: 'CreateSurvey' }") Create New Survey
    v-btn(:to="{ name: 'AnswerSurvey', params: { survey_id: 2 } }") Demo Survey


</template>

<script>
export default {
  methods: {
    onAddSurvey({ title, id }) {
      console.log('onAddSurvey',  { title, id });
    },
  },
  created() {
    this.$eventHub.$on('addSurvey', this.onAddSurvey);
  },
  destroyed() {
    this.$eventHub.$off('addSurvey');
  },
};
</script>
