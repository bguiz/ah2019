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
import { findIndex, propEq, mergeRight } from 'ramda';
import request from 'request';
import axios from 'axios';
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
  },
  data() {
    return {
      showConfirmation: false,
      valid: true,
      survey: {
        title: 'Title of this survey',
        grab_id: 'random',
        currency: 'IDR',
        reward: 10000,
        pax: 30,
      },
      questions: [
        {
          id: Date.now(),
          question: 'random question',
          options: ['Option A', 'Option B', 'Option C'],
          readonly: true,
        },
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

      if (options.length < 3) {
        this.$eventHub.$emit('showSnack', 'Kind of werid with only 1 option');
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
        question: 'Dididid',
        options: ['One', 'Two'],
        readonly: false,
      });
    },

    submit() {
      const allSaved = this.questions.filter(x => !x.readonly).length === 0;

      if (!allSaved) {
        this.$eventHub.$emit('showSnack', 'Some questions are left unsaved');
      } else if (this.$refs.form.validate()) {
        // check for save state
        this.showConfirmation = true;
        const payload = { survey: mergeRight(this.survey, { questions: this.questions }) };
      }
    },
    update(question) {
      const index = this.getQuestionIndex(question.id);
      this.questions.splice(index, 1, question);
    },
  },
};
</script>
