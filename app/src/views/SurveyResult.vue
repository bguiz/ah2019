<template lang="pug">
    Result(v-if="doneLoading" :survey="survey")
</template>

<script>
import Result from '../components/Result.vue';

export default {
  components: {
    Result,
  },
  created() {
    this.getResult(this.$route.params.survey_id);
  },
  data() {
    return {
      doneLoading: false,
      survey: {},
    };
  },
  methods: {
    getResult(surveyId) {
      axios.post('/getResults', { surveyId })
        .then((res) => {
          this.survey = res.data.survey;
          this.doneLoading = true;
        });
    },
  },
};
</script>
