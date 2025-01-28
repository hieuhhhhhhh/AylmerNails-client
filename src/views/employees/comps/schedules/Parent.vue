<template>
  <div v-if="isFetched">
    <div id="title">Current Schedule:</div>
    <div id="note">*Press on the right clock icon to select time</div>

    <Schedule v-if="schedules.length" :key="index" :schedule="schedules[0]" />

    <div id="title">Future Schedules:</div>

    <Schedule
      v-for="(schedule, index) in schedules.slice(1)"
      :key="index"
      :schedule="schedule"
    />
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
  font-style: italic;
  color: rgb(184, 121, 3);
}
</style>