<template lang="pug">
  v-card
    div(v-if="isEdit")
      v-text-field(label="Title" outline solo v-model="title" :rules="rules")
      v-layout.px-2(row wrap)
        v-flex(xs12, md3)
          v-text-field(label="grab id" :rules="rules" v-model="grabID")
        v-flex(xs12, md3)
          v-text-field(label="currency" :rules="rules" v-model="currency" disabled)
        v-flex(xs12, md3)
          v-text-field(label="reward" v-model="reward" :rules="numRules" prepend-icon="attach_money")
        v-flex(xs12, md3)
          v-text-field(label="num of surveyee" :rules="numRules" v-model="pax" prepend-icon="people")

    v-card-title(v-else)
      div.w-100.d-flex
        .display-1 {{ survey.title }}
        v-spacer
        .display-1.text-xs-right Rewards: {{ survey.currency }} {{ survey.reward }}
      v-flex(xs12, md4)
          v-text-field(label="grab id" :rules="rules" v-model="grabID")


</template>

<script>
export default {
  name: 'surveyDetails',
  props: {
    survey: {
      type: Object,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      rules: [v => !!v || 'Whoops, did you forget me?'],
      numRules: [
        v => !!v || 'Whoops, did you forget me?',
        v => {
          const pattern = /^\d+$/;
          return pattern.test(v) || 'I only accept numbers';
        },
      ],
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
        return this.survey.userId;
      },
      set(value) {
        this.$emit('update', { key: 'userId', value });
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
