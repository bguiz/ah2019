<template lang="pug">
  v-container(grid-list-md)
    v-layout(row, wrap)
      .display-3.w-100.text-xs-center {{ survey.title }}

      v-divider
      v-flex(xs12 v-for="(question , index) in survey.questions" :key="'result'+index")
        ResultGraph(:result="question")
        v-divider.pb-3

</template>

<script>
  import ResultGraph from './ResultGraph.vue';

  export default {
    name: 'Result',
    components: {
      ResultGraph,
    },
    props: {
      survey: {
        type: Object,
        required: true,
      },
    },
  }
</script>