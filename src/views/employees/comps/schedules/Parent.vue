<template>
  <div v-if="isFetched">
    <div id="title">Schedules:</div>

    <div v-if="schedules.length">
      <!-- <div id="note">*Press on the right clock icon to select time</div> -->
      <div id="highlight"><Schedule :schedule="schedules[0]" /></div>
    </div>

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
  props: {
    showScheduleWarning: Function,
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
    if (!this.schedules.length) {
      this.showScheduleWarning();
    }

    console.log("schedules: ", this.schedules);
    this.isFetched = true;
  },
};
</script>

<style scoped>
#title {
  display: flex;
  font-size: 18px;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-top: 3px var(--xtrans-gray) solid;
}

#highlight {
  outline: 3px outset;
  width: fit-content;
  max-width: 100%;
  height: fit-content;
}
</style>