<template>
  <div id="layout">
    <div>This is Calendar</div>
    <div id="container">
      <div id="scroll">
        <div v-for="(emp, index) in employees" :key="index">
          <div id="empAlias" :style="{ color: emp.colorCode }">
            {{ emp.alias }}
          </div>
          <div id="row">
            <VerticalTimeMarks />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getTodayUnixTime from "@/lib/getTodayUnixTime";
import fetchDailyAppos from "./apis/fetchDailyAppos";

import VerticalTimeMarks from "./comps/VerticalTimeMarks.vue";

export default {
  name: "Calendar-",
  components: {
    VerticalTimeMarks,
  },
  data() {
    return {
      // resources
      employees: [],
      dayStart: null,
      dayEnd: null,
    };
  },
  async created() {
    const dayInfo = await fetchDailyAppos(getTodayUnixTime());
    this.employees = dayInfo.employees;
    this.dayStart = dayInfo.dayStart;
    this.dayEnd = dayInfo.dayEnd;
  },
};
</script>

<style scoped>
#scroll {
  border: 3px outset;
  overflow-x: scroll;
  height: 100%;
  background: white;
}
#row {
  display: flex;
  height: 100px;
  width: fit-content;
  border-top: 1px solid gray;
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
#container {
  position: relative;
}
#empAlias {
  font-size: 14px;
  font-weight: bold;
  background-color: white;
  position: absolute;
  padding: 5px;
  margin-top: 1px;
  width: fit-content;
  left: 4px;
  z-index: 1;
}
</style>