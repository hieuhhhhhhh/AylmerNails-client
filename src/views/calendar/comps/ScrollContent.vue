<template>
  <div v-if="isFetched && dayEnd && dayStart">
    <div v-for="(emp, index) in employees" :key="index">
      <div id="relative">
        <div
          id="transform"
          :style="{
            transform: `scale(${scaleValue})`,
            marginBottom: -(1 - scaleValue) * 70 + 'px',
          }"
        >
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
            @click.stop="onSelectAppo(appo.id)"
          >
            {{ formatTime(appo.start) }}
            <div id="serviceName">
              {{ appo.serviceName }}
            </div>
          </div>

          <VerticalTimeMarks :dayStart="dayStart" :dayEnd="dayEnd" />
        </div>
      </div>
      <div
        id="empAlias"
        :style="{
          backgroundColor: emp.colorCode,
          fontSize: scaleValue * 14 + 'px',
          padding: scaleValue * 5 + 'px',
        }"
      >
        {{ emp.alias }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, toRef } from "vue";
// lib
import fetchDailyAppos from "../apis/fetchDailyAppos";
import secsToHours from "@/lib/secsToHours";
import secsToLength from "../helpers/secsToLength";
import getCompactScale from "../helpers/getCompactScale";
// comps
import VerticalTimeMarks from "./VerticalTimeMarks.vue";
import GrayPart from "./GrayPart.vue";

export default {
  props: {
    unixDate: Number,
    isCompacting: Boolean,
    width: Number,
    onSelectAppo: Function,
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
    const scaleValue = ref(1); // Default scale value
    const totalWidth = ref(0);

    // reactive props
    const unixDateRef = toRef(props, "unixDate");
    const isCompactingRef = toRef(props, "isCompacting");
    const widthRef = toRef(props, "width");

    // helpers
    const getLeft = (appo) => secsToLength(appo.start - dayStart.value);
    const getWidth = (appo) => secsToLength(appo.end - appo.start);
    const formatTime = (seconds) => secsToHours(seconds);

    // Function to update scale based on width
    const updateScale = (newWidth) => {
      if (!newWidth) return;
      console.log("newWidth:", newWidth);
      const res = getCompactScale(totalWidth.value, newWidth);
      if (res < 1) scaleValue.value = res;
      console.log("scale:", scaleValue.value);
    };

    // API call to fetch daily appointments
    const fetchData = async () => {
      isFetched.value = false;
      const dayInfo = await fetchDailyAppos(props.unixDate);
      console.log("dayInfo", dayInfo);
      employees.value = dayInfo.employees;
      dayStart.value = dayInfo.dayStart;
      dayEnd.value = dayInfo.dayEnd;
      totalWidth.value = secsToLength(dayEnd.value - dayStart.value);
      isFetched.value = true;
    };

    // first load
    onMounted(fetchData);

    // watch unixDate
    watch(unixDateRef, fetchData);

    // watcg isCompacting, width, dayStart - dayEnd,
    watch([isCompactingRef, widthRef, totalWidth], ([isCompacting]) => {
      console.log("width", props.width);
      if (!isCompacting) {
        scaleValue.value = 1;
      } else {
        updateScale(props.width);
      }
    });

    return {
      isFetched,
      employees,
      dayStart,
      dayEnd,
      scaleValue,
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
  justify-content: flex-end;
  right: 3px;
  border: 3px solid white;
  box-sizing: border-box;
  transform: translate(-1px, calc(-100% - 1px));
}

#appo {
  position: absolute;
  padding: 3px;
  height: 100%;
  cursor: pointer;
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
#transform {
  transform-origin: top left;
  height: 70px;
}
</style>
