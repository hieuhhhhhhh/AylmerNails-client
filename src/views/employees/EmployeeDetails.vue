<template>
  <EmployeeInfo />
  <br />
  <div id="title">Schedules:</div>

  <Schedule />
</template>
<script>
// comps
import EmployeeInfo from "./comps/EmployeeInfo.vue";
import Schedule from "./comps/schedules/Schedule.vue";

export default {
  components: {
    EmployeeInfo,
    Schedule,
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
</style>

