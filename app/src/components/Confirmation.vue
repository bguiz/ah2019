<template lang="pug">
  v-dialog(v-model='show', persistent, max-width='290')
    v-card
      v-img(:src='qrCodeUrl', max-height, v-if="isEdit")
      v-card-title(
        :class="{'pt-0': isEdit}",
      )
        div(v-if="isEdit")
          h3.title.mb-0 Grab ID:
            span.green--text.title {{ survey.userId }}
          h3.title.mb-0 Total Cost: {{ survey.currency }} {{ total.toLocaleString() }}
          ul
            li {{ questions.length }} Survey Questions
            li {{ survey.pax }} survyee
            li {{ survey.currency }} {{ survey.reward.toLocaleString() }} reward each

        div(v-else)
          h3.title.mb-2 Confirm Submit Survey?
          h3.subtitle.mb-0 Grab ID:
            span.green--text.title {{ survey.userId }}

          div.pt-2 You will earn {{ survey.currency }}
            span.bold {{ survey.reward.toLocaleString() }}!

      v-card-actions
        v-btn(
          flat,
          :disabled="isLoading",
          @click='hide',
        ) Cancel
        v-spacer
        v-btn(flat, @click='submit' :loading="isLoading") YES!

</template>

<script>
import { pick, pluck, map, mergeRight, omit } from 'ramda';
import qrCodeUrl from '../images/QR_Code.svg?external';

export default {
  name: 'confirmation',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    survey: {
      type: Object,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    total() {
      return parseInt(this.survey.reward) * parseInt(this.survey.pax);
    },
  },
  data() {
    return {
      qrCodeUrl,
      isLoading: false,
    };
  },
  methods: {
    hide() {
      this.$emit('hide');
    },
    submit() {
      if (this.isEdit) {
        const strippedQuestions = map(x => omit(['readonly'], x), this.questions);

        const payload = { survey: mergeRight(this.survey, { questions: strippedQuestions }) };

        //uncomment to call add survey
        this.isLoading = true;
        axios.post('/addSurvey', payload)
          .then(res => {
            this.isLoading = false;
            this.$emit('hide');
            const id = res.data.surveyId;
            this.$router.push({ name: 'home', params: { title: payload.survey.title, id }});
          });
      } else {
        const payload = pick(['userId', 'surveyId'], this.survey);
        const answers = map(x => x, pluck(['answer'], this.questions));
        payload.surveyId = this.$route.params.survey_id;

        this.isLoading = true;
        console.log("answering survey")
        axios.post('/answerSurvey', mergeRight(payload, { answers }))
          .then((res) => {
            this.isLoading = false;
            this.$emit('hide');

            this.$router.push({ name: 'SurveyResult', params: { survey_id: payload.surveyId } });
          });
      }
    },
  },
};
</script>

<style lang="scss">
  .bold {
    font-weight: 600;
  }
  .green--text {
    color: #00B140 !important;
  }
</style>