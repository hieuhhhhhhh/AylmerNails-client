<template>
  <div v-if="isFetched">
    <div id="title">Schedules:</div>

    <div v-if="schedules.length">
      <div id="note">*Press on the right clock icon to select time</div>
      <div id="highlight"><Schedule :schedule="schedules[0]" /></div>
    </div>
    <div v-else id="note">*Warning: employee has no schedules</div>

    <div>
      <Schedule
        v-for="(schedule, index) in schedules.slice(1)"
        :key="index"
        :schedule="schedule"
      /><br />
      <br />
    </div>
  </div>
  <AddSchedule />
</template>

<script>
import AddSchedule from "./AddSchedule.vue";
import fetchSchedules from "../../apis/fetchSchedules";
import Schedule from "./Schedule.vue";

export default {
  components: {
    AddSchedule,
    Schedule,
  },
  name: "SchedulesParent",
  data() {
    return {
      // resources
      schedules: [],
      // status
      isFetched: false,
    };
  },
  async created() {
    const empId = this.$route.params.id;
    this.schedules = await fetchSchedules(empId);
    console.log("schedules: ", this.schedules);
    this.isFetched = true;
  },
};
</script>

<style scoped>
#title {
  display: flex;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-top: 3px var(--xtrans-gray) solid;
}
#note {
  padding: 10px;
  color: rgb(184, 121, 3);
}
#highlight {
  outline: 3px outset;
  width: fit-content;
  max-width: 100%;
  height: fit-content;
}
</style>