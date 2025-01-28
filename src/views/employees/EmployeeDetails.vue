<template>
  <EmployeeInfo />
  <br />

  <Schedule />
</template>
<script>
// comps
import EmployeeInfo from "./comps/EmployeeInfo.vue";
import Schedule from "./comps/schedules/Parent.vue";

export default {
  components: {
    EmployeeInfo,
    Schedule,
  },
};
</script>


