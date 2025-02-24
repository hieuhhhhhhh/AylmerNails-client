<template>
  <div id="layout" v-if="isFetched">
    <DayInput
      :unixDate="unixDate"
      :onInputDate="onInputDate"
      :onMoveLeft="onMoveLeft"
      :onMoveRight="onMoveRight"
      :onMoveEnd="onMoveEnd"
    />

    <div id="relative">
      <div id="scroll">
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
    </div>
  </div>
</template>

<script>
// lib
import fetchDailyAppos from "./apis/fetchDailyAppos";
import secsToHours from "@/lib/secsToHours";
// comps
import VerticalTimeMarks from "./comps/VerticalTimeMarks.vue";
import secsToLength from "./helpers/secsToLength";
import GrayPart from "./comps/GrayPart.vue";

import DayInput from "./comps/DayInput.vue";

export default {
  name: "Calendar-",
  components: {
    VerticalTimeMarks,
    DayInput,
    GrayPart,
  },
  data() {
    return {
      // status
      isFetched: false,
      // resources
      unixDate: null,
      employees: [],
      dayStart: null,
      dayEnd: null,
    };
  },
  methods: {
    getLeft(appo) {
      const gap = appo.start - this.dayStart;
      return secsToLength(gap);
    },
    getWidth(appo) {
      const gap = appo.end - appo.start;
      return secsToLength(gap);
    },
    formatTime(seconds) {
      return secsToHours(seconds);
    },
    onMoveRight() {
      const scrollElement = document.getElementById("scroll");
      if (scrollElement) {
        scrollElement.scrollLeft += 140;
      }
    },
    onMoveLeft() {
      const scrollElement = document.getElementById("scroll");
      if (scrollElement) {
        scrollElement.scrollLeft -= 140;
      }
    },
    onMoveEnd(onward) {
      const scrollElement = document.getElementById("scroll");
      if (onward) {
        scrollElement.scrollLeft = scrollElement.scrollWidth;
      } else {
        scrollElement.scrollLeft = 0;
      }
    },
    async onInputDate(value) {
      this.$router.push(`/calendar/${value}`);
      this.unixDate = value;
      await this.fetchData();
    },
    async fetchData() {
      const dayInfo = await fetchDailyAppos(this.unixDate);
      console.log("dayInfo", dayInfo);
      this.employees = dayInfo.employees;
      this.dayStart = dayInfo.dayStart;
      this.dayEnd = dayInfo.dayEnd;

      // update status
      this.isFetched = true;
    },
  },
  async created() {
    // fetch unix date from URL
    this.unixDate = Number(this.$route.params.unixDate);

    // fetch date's schedule
    this.fetchData();
  },
};
</script>

<style scoped>
#scroll {
  font-size: 14px;
  border: 3px outset;
  overflow-x: auto;
  height: 100%;
  background: white;
  color: black;
}

#layout {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100vw;
  margin-inline: auto;
  flex-grow: 1;
  box-sizing: border-box;
}
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