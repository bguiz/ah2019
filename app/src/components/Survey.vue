<template lang="pug">
v-container(grid-list-md)
  v-layout(row, wrap)
    v-form.w-100(ref="form", v-model="valid", lazy-validation)
      SurveyDetails(
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
        v-btn(@click="addQuestion") Add Question
        v-spacer
        v-btn(s
          v-if="questions.length > 0",
          color="primary",
          @click="submit",
        ) Create
</template>

<script>
import { findIndex, propEq, mergeRight } from 'ramda';
import request from 'request';
import axios from 'axios';
import MCQ from './MCQ.vue';
import SurveyDetails from './SurveyDetails.vue';

export default {
  name: 'survey',
  components: {
    MCQ,
    SurveyDetails,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      valid: true,
      survey: {
        title: 'Title',
        grab_id: 'random',
        currency: 'INDR',
        reward: 10,
        pax: 10,
      },
      questions: [
        {
          id: Date.now(),
          question: 'random question',
          options: ['Option A', 'Option B'],
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

      if (this.$refs.form.validate() && allSaved) {
        // check for save state
        console.log('wag');
        // const payload = { survey: mergeRight(this.survey, { questions: this.questions }) };
        // axios.post('http://localhost:3333/addSurvey', payload).then(res => {
        //   console.log(res);
        // });
        const payload2 = { surveyId : 1 };
        axios.post('http://localhost:3333/getSurvey',payload2).then(res => {
          console.log(res)
        })
      //   request.post('http://localhost:3333/addSurvey',payload,function optionalCallback(err, httpResponse, body) {
      //   if (err) {
      //     return console.error('upload failed:', err);
      //   }
      //   console.log('Upload successful!  Server responded with:', body);
      // });
        // axios.post('/addSurvey', payload)
        //   .then((res) => {
        //     console.log(res);
        //   });
      }
    },
    update(question) {
      const index = this.getQuestionIndex(question.id);
      this.questions.splice(index, 1, question);
    },
  },
};
</script>
