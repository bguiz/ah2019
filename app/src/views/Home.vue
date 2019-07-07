<template lang="pug">
  v-layout(row wrap)
    v-btn(:to="{ name: 'CreateSurvey' }") Create New Survey
    v-btn(:to="{ name: 'AnswerSurvey', params: { survey_id: 10 } }") Demo Survey
    v-btn(:to="{ name: 'SurveyResult', params: { survey_id: 10 } }") Results

    
</template>

<script>
export default {};
</script>
