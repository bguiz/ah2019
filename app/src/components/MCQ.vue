<template lang="pug">
  v-flex(xs12)
    v-card
      v-card-title.pb-0
        .sub-heading.w-100.pb-2 Question {{ questionNum + 1 }}
        .title(v-if="!isEdit || readonly") {{ question.question }}
      v-card-title
        v-flex(xs12 v-if="!isEdit || readonly")
          v-radio-group.mt-0(
            v-model='answer',
            :rules="answerRules",
          )
            v-radio(
              v-for='(option, key) in question.options',
              :key="'answer'+key",
              :label='option',
              :value='key',
            )

        v-flex(xs12 v-else)
          v-form.w-100(:ref="formRef", v-model="valid", lazy-validation)
            v-text-field(
              v-if="!readonly",
              v-model="value",
              ref="field",
              outline,
              solo,
              required,
              :rules="rules",
              validate-on-blur,
            )
            MCQOption(
              v-for="(option, key) in question.options",
              :key="'option' + key",
              :ref="'mcq'+key",
              :option="option",
              @update="updateMCQOption($event, key)",
              @remove="removeOption(key)",
            )
          v-btn(
            v-if="!readonly",
            @click="$emit('addOption', question.id)"
          ) Add Option
        
      v-divider
      v-card-actions(v-if="isEdit")
        v-spacer
        v-btn(v-if="!readonly" @click="submit") Save
        v-btn(v-else="readonly" @click="updateReadOnly(false)") Edit
        v-btn(@click="$emit('removeQuestion', question.id)") {{ readonly ? 'Remove' : 'Cancel' }}
        
        
</template>

<script>
import { mergeRight } from 'ramda';
import MCQOption from './MCQOption.vue';

export default {
  name: 'MCQ',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    question: {
      type: Object,
      required: true,
    },
    questionNum: {
      type: Number,
      required: true,
    },
  },
  components: {
    MCQOption,
  },
  computed: {
    answerRules() {
      return this.isEdit ? [] : this.rules;
    },

    formRef() {
      return 'questionNum' + this.questionNum;
    },

    readonly() {
      return this.question.readonly;
    },

    answer: {
      get() {
        return this.question.answer;
      },
      set(val) {
        this.$emit(
          'update',
          mergeRight(this.question, {
            answer: val,
          }),
        );
      },
    },

    value: {
      get() {
        return this.question.question;
      },
      set(val) {
        this.$emit(
          'update',
          mergeRight(this.question, {
            question: val,
          }),
        );
      },
    },
  },
  data() {
    return {
      valid: true,
      rules: [(v) => {
        return v !== null || 'Whoops, did you forget me?';
      }],
    };
  },
  methods: {
    removeOption(index) {
      this.$emit('removeOption', {
        id: this.question.id,
        index,
      });
    },

    updateMCQOption(value, index) {
      this.question.options[index] = value;
      this.$emit('update', this.question);
    },

    update(value) {
      if (value.trim()) {
        this.error = false;
      }
      const payload = this.isEdit ? { question: value } : { answer: value };

      this.$emit('update', mergeRight(this.question, payload));
    },

    updateReadOnly(readonly) {
      this.$emit(
        'update',
        mergeRight(this.question, {
          readonly,
        }),
      );
    },

    submit() {
      if (this.$refs[this.formRef].validate()) {
        this.updateReadOnly(true);
      }
    },
  },
};
</script>

<style lang="styl">
.w-100
  width 100%

.v-text-field--box.v-text-field--single-line input, .v-text-field--full-width.v-text-field--single-line input, .v-text-field--outline.v-text-field--single-line input
  margin-top 0
</style>
