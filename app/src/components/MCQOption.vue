<template lang="pug">
  v-layout.w-100(align-center justify-space-between row)
    v-text-field(
      v-model="value",
      placeholder="Option details...",
      prepend-icon="control_point",
      :rules="rules",
    )
    v-btn(icon @click="$emit('remove')")
      v-icon close
</template>

<script>
export default {
  name: 'MCQOption',
  props: {
    option: {
      type: String,
      required: true,
    },
  },
  computed: {
    value: {
      get() {
        return this.option;
      },
      set(val) {
        this.$emit('update', val);
      },
    },
  },
  data() {
    return {
      error: false,
      rules: [v => !!v || 'Whoops, did you forget me?'],
    };
  },
};
</script>
