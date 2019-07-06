<template lang="pug">
  v-layout(row wrap)
    v-btn(:to="{ name: 'CreateSurvey' }") Create New Survey
    v-btn(:to="{ name: 'AnswerSurvey', params: { survey_id:' 2' } }") Demo Survey

    
</template>

<script>
import HelloWorld from '../components/HelloWorld';
// { name: 'user', params: { userId: '123' } }
export default {
  components: {
    HelloWorld,
  },
};
</script>
