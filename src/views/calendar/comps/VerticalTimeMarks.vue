<template>
  <div
    id="container"
    :style="{ width: width + 'px', marginLeft: marginLeft + 'px' }"
  >
    <div
      v-for="hour in 24"
      :key="hour"
      class="verticalLine"
      :style="{ width: secsToLength(60 * 60) + 'px' }"
    ></div>
  </div>
</template>

<script>
// lib
import secsToLength from "../helpers/secsToLength";

export default {
  props: {
    dayStart: Number,
    dayEnd: Number,
  },
  methods: {
    secsToLength,
  },
  computed: {
    width() {
      return secsToLength(this.dayEnd || 24 * 60 * 60);
    },
    marginLeft() {
      return -secsToLength(this.dayStart || 0);
    },
  },
  created() {
    console.log("dayEnd", this.dayEnd);
    console.log("dayStart", this.dayStart);
  },
};
</script>

<style scoped>
.verticalLine {
  border: 1px solid rgb(193, 193, 193);
  flex-shrink: 0;
  box-sizing: border-box;
}
#container {
  overflow: hidden;
  display: flex;
  height: 100%;
  box-sizing: border-box;
}
</style>
