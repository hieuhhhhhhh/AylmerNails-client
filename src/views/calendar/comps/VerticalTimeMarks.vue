<template>
  <div
    v-for="hour in 24"
    :key="hour"
    class="verticalLine"
    :style="{ width: secsToLength(60 * 60) - 1 + 'px' }"
  ></div>
</template>

<script>
import secsToLength from "../helpers/secsToLength";

export default {
  methods: {
    secsToLength,
  },
};
</script>

<style scoped>
.verticalLine {
  border-left: 1px solid gray;

  flex-shrink: 0;
}
</style>
