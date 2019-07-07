<template lang="pug">
v-container(grid-list-md)
  v-layout(row, wrap)
    v-form.w-100(ref="form", v-model="valid", lazy-validation)
      SurveyDetails(
        :isEdit="isEdit",
        :survey="survey",
        @update="updateSurvey",
      )
      v-layout(row wrap)
        MCQ(
          v-for="(question, key) in questions",
          :question="question",
          :key="key",
          :questionNum="key",
          :isEdit="isEdit",
          @update="update($event)",
          @addOption="addOption",
          @removeQuestion="removeQuestion($event)",
          @removeOption="removeOption($event)",
        )
      v-layout.mt-2(row, wrap)
        v-btn(@click="addQuestion" v-if="isEdit") Add Question
        v-spacer
        v-btn(
          v-if="questions.length > 0",
          color="primary",
          @click="submit",
        ) {{ isEdit ? 'Create' : 'Submit' }}
  Confirmation(
    :survey="survey",
    :questions="questions",
    :isEdit="isEdit",
    :show="showConfirmation",
    @hide="showConfirmation = false",
  )
</template>

<script>
import { findIndex, propEq, has, omit } from 'ramda';
import request from 'request';
import MCQ from './MCQ.vue';
import SurveyDetails from './SurveyDetails.vue';
import Confirmation from './Confirmation.vue';

export default {
  name: 'survey',
  components: {
    Confirmation,
    MCQ,
    SurveyDetails,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    surveyData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    if (this.surveyData && has('questions', this.surveyData)) {
      this.questions = this.surveyData.questions;
      this.survey = omit(['questions'], this.surveyData);
    }
  },
  data() {
    return {
      showConfirmation: false,
      valid: true,
      survey: {
        title: 'This is a test survey for creation demo',
        description: 'Good to have',
        userId: 'yourgrabID',
        currency: 'IDR',
        reward: 10000,
        pax: 30,
      },
      questions: [
        {
          id: Date.now(),
          question: 'What day is it',
          options: ['Monday','Tuesday','Wednesday','Saturday'],
          readonly: true,
        },
        {
          id: Date.now(),
          question: 'Where are we',
          options: ['Singapore','New Zealand','Australia '],
          readonly: true,
        },
        {
          id: Date.now(),
          question: 'Is Chainstack good',
          options: ['YES','VERY','Extremely','TOTALLY GOOD'],
          readonly: true,
        }
      ],
    };
  },
  methods: {
    getQuestionIndex(id) {
      return findIndex(propEq('id', id))(this.questions);
    },

    addOption(id) {
      const index = this.getQuestionIndex(id);
      const options = this.questions[index].options;

      if (options.length === 4) {
        this.$eventHub.$emit('showSnack', 'Sorry bro, we only support 4 question');
      } else {
        options.push('');
      }
    },

    updateSurvey({ key, value }) {
      this.survey[key] = value;
    },

    removeOption({ id, index }) {
      const questionIndex = this.getQuestionIndex(id);
      const options = this.questions[questionIndex].options;

      if (options.length !== 4) {
        this.$eventHub.$emit('showSnack', 'Must have 4 options');
      } else {
        options.splice(index, 1);
      }
    },

    removeQuestion(id) {
      const index = this.getQuestionIndex(id);
      this.questions.splice(index, 1);
    },

    addQuestion() {
      this.questions.push({
        id: Date.now(),
        question: '',
        options: ['', ''],
        readonly: false,
      });
    },

    submit() {
      const allSaved = this.questions.filter(x => !x.readonly).length === 0;

      if (!allSaved && this.isEdit) {
        this.$eventHub.$emit('showSnack', 'Some questions are left unsaved');
      } else if (this.$refs.form.validate()) {
        this.showConfirmation = true;
      }
    },
    update(question) {
      const index = this.getQuestionIndex(question.id);
      this.questions.splice(index, 1, question);
    },
  },
};
</script>
