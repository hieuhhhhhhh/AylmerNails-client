<template>
  <div v-if="appoCount > 0">({{ appoCount }})</div>
</template>
<script>
// lib
import { ref } from "vue";

export default {
  setup() {
    const appoCount = ref(0);
    return {
      appoCount,
    };
  },
};
</script>
