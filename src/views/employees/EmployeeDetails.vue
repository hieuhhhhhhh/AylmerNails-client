<template>
  <div id="warning" v-if="showWarning">Warning: No schedules have been set</div>
  <EmployeeInfo />
  <br />

  <Schedule :showScheduleWarning="showScheduleWarning" />
</template>
<script>
import { ref } from "vue";
// comps
import EmployeeInfo from "./comps/EmployeeInfo.vue";
import Schedule from "./comps/schedules/Parent.vue";

export default {
  components: {
    EmployeeInfo,
    Schedule,
  },
  setup() {
    // status
    const showWarning = ref(false);

    const showScheduleWarning = () => {
      showWarning.value = true;
    };

    return {
      showScheduleWarning,
      showWarning,
    };
  },
};
</script>


<style scoped>
#warning {
  padding: 10px;
  color: red;
}
</style>