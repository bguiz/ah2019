<template lang="pug">
  v-layout.text-xs-center(row wrap)
    v-flex.display-2.mb-2(xs12) {{ result.question }}
    v-flex.pb-4(xs6 v-for="(option, key) in result.options" :key="'graph'+key")
      v-progress-circular(
        :size="100" :width="15" :value="getPercentage(key)" color="primary"
      ) {{ getPercentage(key) }}%
      .title.mt-2 {{ option }}
</template>

<script>
import {
  sum,
} from 'ramda';

export default {
  name: 'graph',
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totalCount() {
      return sum(this.result.answerCounts);
    },
  },
  methods: {
    getPercentage(index) {
      const r = this.result.answerCounts[index] / this.totalCount * 100;
      return Math.round(r * 10) / 10
    },
  }
}
</script>