<template lang="pug">
  v-card
    v-text-field(label="Title" outline solo v-model="title" :rules="rules")
    v-layout.px-2(row wrap)
      v-flex(xs12, md3)
        v-text-field(label="grab id" :rules="rules" v-model="grabID")
      v-flex(xs12, md3)
        v-text-field(label="currency" :rules="rules" v-model="currency" disabled)
      v-flex(xs12, md3)
        v-text-field(label="reward" v-model="reward" :rules="rules")
      v-flex(xs12, md3)
        v-text-field(label="num of surveyee" :rules="rules" v-model="pax")

</template>

<script>
import { type } from 'ramda';

export default {
  name: 'surveyDetails',
  props: {
    survey: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rules: [v => !!v || 'Whoops, did you forget me?'],
    };
  },
  computed: {
    title: {
      get() {
        return this.survey.title;
      },
      set(value) {
        this.$emit('update', { key: 'title', value });
      },
    },
    grabID: {
      get() {
        return this.survey.grab_id;
      },
      set(value) {
        this.$emit('update', { key: 'grab_id', value });
      },
    },
    currency: {
      get() {
        return this.survey.currency;
      },
      set(value) {
        this.$emit('update', { key: 'currency', value });
      },
    },
    reward: {
      get() {
        return this.survey.reward;
      },
      set(value) {
        this.$emit('update', { key: 'reward', value });
      },
    },
    pax: {
      get() {
        return this.survey.pax;
      },
      set(value) {
        this.$emit('update', { key: 'pax', value });
      },
    },
  },
};
</script>
