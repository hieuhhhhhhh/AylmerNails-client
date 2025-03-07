<template>
  <div
    id="container"
    :style="{ width: width() + 'px', marginLeft: marginLeft() + 'px' }"
  >
    <div
      v-for="hour in 24"
      :key="hour"
      class="verticalLine"
      :style="{ width: secsToLength(60 * 60) + 'px' }"
    >
      {{ formatHour(hour - 1) }}
    </div>
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
  setup(props) {
    console.log("dayEnd", props.dayEnd);
    console.log("dayStart", props.dayStart);

    // STYLES
    const width = () => {
      return secsToLength(props.dayEnd || 24 * 60 * 60);
    };

    const marginLeft = () => {
      return -secsToLength(props.dayStart || 0);
    };

    // FORMAT
    const formatHour = (hour) => {
      const period = hour < 12 ? "am" : "pm";
      const displayHour = hour % 12 || 12; // Converts 0 -> 12, 13 -> 1, etc.
      return `${displayHour} ${period}`;
    };

    return {
      width,
      marginLeft,
      secsToLength,
      formatHour,
    };
  },
};
</script>

<style scoped>
.verticalLine {
  flex-shrink: 0;
  box-sizing: border-box;
}
#container {
  color: rgb(49, 49, 49);
  overflow: hidden;
  display: flex;
  box-sizing: border-box;
}
</style>
