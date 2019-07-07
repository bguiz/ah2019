<template lang="pug">
    Survey(:surveyData="survey")
</template>

<script>
import Survey from '../components/Survey';

const surveyTemplate = {
  survey: {
    surveyId: 10,
    userId: '9285100IIwjnap',
    currency: 'IDR',
    pax: 30,
    reward: 10000,
    title: 'Makan Sedap (Tasty Food)',
    description: 'Good to have',
    questions: [
      {
        id: 1562403386842,
        question: 'Manis',
        options: [
          'Teh Tarik',
          'Teh O',
          'Kopi O',
          'Milo Ice',
        ],
      },
      {
        id: 1562403535945,
        question: 'Murah',
        options: [
          'Nasi LeMak',
          'Mee Rebus',
          'Mee Siam',
          'Mee Sota',
        ],
      },
      {
        id: 1562403535324,
        question: 'Pedas',
        options: [
          'Ayam goreng',
          'Ikan Goreng',
          'Ayam penyet',
          'Sambal',
        ],
      },
      {
        id: 1562403565934,
        question: 'Sejuk',
        options: [
          'Milo',
          'Horlicks',
          'Teh',
          'Coca cola',
        ],
      },
      {
        id: 1562403535434,
        question: 'Is chainstack good :)',
        options: [
          'very',
          'extremely',
          'extremely extremely',
          'veryveryverty',
        ],
      },
    ],
  },
};

export default {
  components: {
    Survey,
  },
  created() {
    this.getSurvey(this.$route.params.survey_id);
  },
  data() {
    return {
      survey: {},
    };
  },
  methods: {
    getSurvey(surveyId) {
      // this.survey = surveyTemplate.survey;
      // uncomment this to call getSurvey api
      axios.post('/getSurvey', { surveyId })
        .then((res) => {
          this.survey = res.body.data.survey;
        });
    },
  },
};
</script>
