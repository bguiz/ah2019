<template lang="pug">
  v-dialog(v-model='show', persistent, max-width='290')
    v-card
      v-img(:src='qrCodeUrl', max-height)
      v-card-title.pt-0
        div
          h3.title.mb-0 Total Cost: {{ survey.currency }} {{ total.toLocaleString() }}
          ul
            li {{ questions.length }} Survey Questions
            li {{ survey.pax }} survyee 
            li {{ survey.currency }} {{ survey.reward.toLocaleString() }} reward each

      v-card-actions
        v-btn(
          flat,
          :disabled="isLoading",
          @click='hide',
        ) Cancel
        v-spacer
        v-btn(flat, @click='submit' :loading="isLoading") YES!
</template>

<script>
import qrCodeUrl from '../images/QR_Code.svg?external';

export default {
  name: 'confirmation',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    survey: {
      type: Object,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    total() {
      return parseInt(this.survey.reward) * parseInt(this.survey.pax);
    },
  },
  data() {
    return {
      qrCodeUrl,
      isLoading: false,
    };
  },
  methods: {
    hide() {
      this.$emit('hide');
    },
    submit() {
      this.dialog = false;
      console.log('woot');
    },
  },
};
</script>
