<template>
  <div id="layout">
    <div>This is Calendar</div>
    <div id="aliasRelative">
      <div id="scroll">
        <div v-for="(emp, index) in employees" :key="index">
          <div id="appoRelative">
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

              <div id="serviceName">{{ appo.serviceName }}</div>
            </div>
          </div>
          <div id="empAlias">
            {{ emp.alias }}
          </div>
          <div id="graduations">
            <VerticalTimeMarks />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// lib
import getTodayUnixTime from "@/lib/getTodayUnixTime";
import fetchDailyAppos from "./apis/fetchDailyAppos";
import secsToHours from "@/lib/secsToHours";
// comps
import VerticalTimeMarks from "./comps/VerticalTimeMarks.vue";
import secsToLength from "./helpers/secsToLength";

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
  },
  async created() {
    const dayInfo = await fetchDailyAppos(getTodayUnixTime());
    console.log(dayInfo);
    this.employees = dayInfo.employees;
    this.dayStart = dayInfo.dayStart;
    this.dayEnd = dayInfo.dayEnd;
  },
};
</script>

<style scoped>
#scroll {
  font-size: 14px;

  border: 3px outset;
  overflow-x: scroll;
  height: 100%;
  background: white;
  color: black;
}
#graduations {
  display: flex;
  height: 70px;
  width: fit-content;
  box-sizing: border-box;
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
  background-color: white;
  padding: 3px;
  margin: 1px;
  width: fit-content;
}
#aliasRelative {
  position: relative;
  z-index: 0;
}
#appo {
  position: absolute;
  padding: 3px;
  height: 70px;
  border: 1px solid black;
  box-sizing: border-box;
}
#appoRelative {
  position: relative;
  z-index: 0;
}
#serviceName {
  font-weight: bold;
}
</style>