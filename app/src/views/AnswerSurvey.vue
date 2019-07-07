<template lang="pug">
    Survey(:surveyData="survey" v-if="doneLoading")
</template>

<script>
import Survey from '../components/Survey';

export default {
  components: {
    Survey,
  },
  created() {
    this.getSurvey(this.$route.params.survey_id);
  },
  data() {
    return {
      doneLoading: false,
      survey: {},
    };
  },
  methods: {
    getSurvey(surveyId) {
      axios.post('/getSurvey', { surveyId })
        .then((res) => {
          this.survey = res.data.survey;
          this.survey.userId = 'grab_xuwhh12';
          this.doneLoading = true;
        });
    },
  },
};
</script>
