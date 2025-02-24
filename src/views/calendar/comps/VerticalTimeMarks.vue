<template>
  <div
    v-for="hour in 24"
    :key="hour"
    class="verticalLine"
    :style="{ width: secsToLength(60 * 60) + 'px' }"
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
  border: 1px solid rgb(193, 193, 193);
  flex-shrink: 0;
  box-sizing: border-box;
}
</style>
