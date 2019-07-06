<template lang="pug">
    Survey
</template>

<script>
import Survey from '../components/Survey';

export default {
  components: {
    Survey,
  },
  created() {
    console.log(this.$route.params);
  },
};
</script>
