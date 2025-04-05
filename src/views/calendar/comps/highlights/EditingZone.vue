<template>
  <div id="main" v-if="EZstates.date == date && EZstates.empId == empId">
    <div
      id="content"
      :style="{
        left: left + 'px',
        width: width + 'px',
        marginLeft: marginLeft + 'px',
      }"
    ></div>
  </div>
</template>

<script setup>
// lib
import { computed, defineProps } from "vue";
import secsToLength from "../../helpers/secsToLength";

const props = defineProps({
  empId: Number,
  date: Number,
  dayStart: Number,
  EZstates: Object,
});

// resources
const left = computed(() => secsToLength(props.EZstates.start));
const width = computed(() => secsToLength(props.EZstates.duration));
const marginLeft = computed(() => -secsToLength(props.dayStart || 0));
</script>

<script>
export default {};
</script>


<style scoped>
#content {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: absolute;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 4px;
  height: 70px;
  background: rgba(215, 215, 215, 0.7);
  cursor: pointer;
  user-select: none;
  pointer-events: none;
}

#main {
  position: relative;
}
</style>