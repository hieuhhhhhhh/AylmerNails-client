<template>
  <div
    id="container"
    :style="{ width: width + 'px', marginLeft: marginLeft + 'px' }"
  >
    <NewAppoMark
      :time="slTime"
      :activeKey="NAMkey"
      :NAMvisible="NAMvisible"
      :onSelectNAM="onSelectNAM"
    />
    <div
      v-for="hour in 24"
      :key="hour"
      class="verticalLine"
      :style="{ width: secsToLength(60 * 60) + 'px' }"
      @click="onSelectOffset($event, hour - 1)"
    ></div>
  </div>
</template>

<script setup>
// lib
import { computed, onMounted, defineProps, ref } from "vue";
import secsToLength from "../helpers/secsToLength";
import lengthToSecs from "../helpers/lengthToSecs";
// comps
import NewAppoMark from "./highlights/NewAppoMark.vue";

// resources
const slTime = ref(0); // seconds
const NAMkey = ref(0);

const props = defineProps({
  dayStart: Number,
  dayEnd: Number,
  NAMvisible: Boolean,
  onSelectNAM: Function,
  EZvisible: Boolean,
});

function onSelectOffset(event, hour) {
  const offsetToTime = lengthToSecs(event.offsetX) + hour * 60 * 60;
  slTime.value = offsetToTime - (offsetToTime % (60 * 15));
  NAMkey.value++;
}

const width = computed(() => secsToLength(props.dayEnd || 24 * 60 * 60));
const marginLeft = computed(() => -secsToLength(props.dayStart || 0));

onMounted(() => {
  console.log("dayEnd", props.dayEnd);
  console.log("dayStart", props.dayStart);
});
</script>

<script>
export default {
  components: { NewAppoMark },
};
</script>


<style scoped>
.verticalLine {
  border: 1px solid rgb(215, 215, 215);
  flex-shrink: 0;
  box-sizing: border-box;
  /* cursor: pointer; */
}
#container {
  overflow: hidden;
  display: flex;
  height: 100%;
  box-sizing: border-box;
}
</style>
