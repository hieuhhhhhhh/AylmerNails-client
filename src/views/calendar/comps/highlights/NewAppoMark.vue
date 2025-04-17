<template>
  <div id="main">
    <div
      v-if="visible && NAMvisible"
      id="content"
      ref="divRef"
      tabindex="0"
      @blur="onBlur"
      @click="onSelectNAM(time)"
      :style="{ left: left + 'px', width: width + 'px' }"
    >
      {{ secsToHours(time) }}
    </div>
  </div>
</template>


<script setup>
// lib
import { defineProps, nextTick, ref, watch } from "vue";
import { computed } from "vue";
import secsToLength from "../../helpers/secsToLength";
import secsToHours from "@/lib/secsToHours";

// PARAMS
const props = defineProps({
  time: Number,
  activeKey: Number,
  NAMvisible: Boolean,
  onSelectNAM: Function,
});
// status
const visible = ref(false);
// resources
const divRef = ref(null);
const left = computed(() => secsToLength(props.time));
const width = secsToLength(15 * 60);

// INPUT
function onBlur() {
  visible.value = false;
}

// DEPENDENT
watch(
  () => props.activeKey,
  () => {
    visible.value = true;
    nextTick(() => {
      divRef.value?.focus();
    });
  }
);
</script>

<script>
export default {};
</script>


<style scoped>
#content {
  position: absolute;
  display: flex;
  text-align: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 4px;
  height: 70px;
  background: white;
  cursor: pointer;
  user-select: none;
}

#content:active {
  background: rgb(215, 215, 215);
}

#main {
  position: relative;
}
</style>