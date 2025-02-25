<template>
  <div v-if="start && end">
    <div
      id="grayPart"
      :style="{
        width: getStartWidth() + 'px',
      }"
      @click.stop
    />
    <div
      id="grayPart"
      :style="{
        width: getEndWidth() + 'px',
        marginLeft: getEndMargin() + 'px',
      }"
      @click.stop
    />
  </div>
  <div v-else>
    <div id="grayPart" :style="{ width: getDefaultWidth() + 'px' }" />
  </div>
</template>
<script>
// lib
import secsToLength from "../helpers/secsToLength";

export default {
  props: {
    dayStart: Number,
    dayEnd: Number,
    start: Number,
    end: Number,
  },
  methods: {
    getStartWidth() {
      return secsToLength(Math.abs(this.start - this.dayStart));
    },
    getEndWidth() {
      return secsToLength(Math.abs(this.dayEnd - this.end));
    },
    getEndMargin() {
      return secsToLength(Math.abs(this.end - this.dayStart));
    },
    getDefaultWidth() {
      return secsToLength(Math.abs(this.dayEnd - this.dayStart));
    },
  },
};
</script>
<style scoped>
#grayPart {
  position: absolute;
  background-color: rgb(193, 193, 193);
  height: 100%;
}
</style>