<template lang="pug">
  v-layout(row wrap)
    v-btn(:to="{ name: 'CreateSurvey' }") Create New Survey
    v-btn(:to="{ name: 'AnswerSurvey', params: { survey_id: 10 } }") Demo Survey
    v-btn(:to="{ name: 'SurveyResult', params: { survey_id: 10 } }") Demo Result
    v-btn(v-if="id !== 0" @click.native="redirect") {{ title }}


</template>

<script>
export default {
  name: 'Home',
  props: {
    id: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    redirect() {
      this.$router.push({name: 'AnswerSurvey', params: { survey_id: this.id } });
    },
  },
};
</script>
