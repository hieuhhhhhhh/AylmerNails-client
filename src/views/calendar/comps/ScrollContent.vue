<template>
  <div v-if="isFetched">
    <div v-for="(emp, index) in employees" :key="index">
      <div id="relative">
        <GrayPart
          :dayStart="dayStart"
          :dayEnd="dayEnd"
          :start="emp.start"
          :end="emp.end"
        />
        <div
          id="appo"
          v-for="(appo, index) in emp.appos"
          :key="index"
          :style="{
            left: getLeft(appo) + 'px',
            width: getWidth(appo) + 'px',
            backgroundColor: emp.colorCode,
          }"
        >
          {{ formatTime(appo.start) }}
          <div id="serviceName">
            {{ appo.serviceName }}
          </div>
        </div>
      </div>

      <VerticalTimeMarks :dayStart="dayStart" :dayEnd="dayEnd" />
      <div id="empAlias" :style="{ backgroundColor: emp.colorCode }">
        {{ emp.alias }}
      </div>
    </div>
  </div>
</template>

<script>
// lib
import { ref, watch, onMounted } from "vue";
import fetchDailyAppos from "../apis/fetchDailyAppos";
import secsToHours from "@/lib/secsToHours";
import secsToLength from "../helpers/secsToLength";
// comps
import VerticalTimeMarks from "./VerticalTimeMarks.vue";
import GrayPart from "./GrayPart.vue";

export default {
  props: {
    unixDate: Number,
  },
  components: {
    VerticalTimeMarks,
    GrayPart,
  },
  setup(props) {
    // status
    const isFetched = ref(false);
    // resources
    const employees = ref([]);
    const dayStart = ref(null);
    const dayEnd = ref(null);

    // helpers
    const getLeft = (appo) => secsToLength(appo.start - dayStart.value);
    const getWidth = (appo) => secsToLength(appo.end - appo.start);
    const formatTime = (seconds) => secsToHours(seconds);
    const fetchData = async () => {
      isFetched.value = false;
      const dayInfo = await fetchDailyAppos(props.unixDate);
      console.log("dayInfo", dayInfo);
      employees.value = dayInfo.employees;
      dayStart.value = dayInfo.dayStart;
      dayEnd.value = dayInfo.dayEnd;
      isFetched.value = true;
    };

    // first
    onMounted(fetchData);

    // dependencies
    watch(() => props.unixDate, fetchData);

    return {
      isFetched,
      employees,
      dayStart,
      dayEnd,
      getLeft,
      getWidth,
      formatTime,
    };
  },
};
</script>

<style scoped>
#empAlias {
  position: absolute;
  font-weight: bold;
  padding: 5px;
  width: fit-content;
  right: 3px;
  border: 3px solid white;
  box-sizing: border-box;
  transform: translate(-1px, calc(-100% - 1px));
}

#appo {
  position: absolute;
  padding: 3px;
  height: 70px;
  border: 1px solid black;
  box-sizing: border-box;
}
#relative {
  position: relative;
  z-index: 0;
}
#serviceName {
  font-weight: bold;
}
</style>
