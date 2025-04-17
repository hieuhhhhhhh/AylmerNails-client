<template>
  <div id="title">My Appointments</div>
  <AppoModal v-if="appo" :appo="appo" :onCancel="onCancel" />
  <table>
    <tbody>
      <tr>
        <th>Service</th>
        <th>Date</th>
        <th>Time</th>
        <th>Duration</th>
      </tr>
      <tr v-if="futureAppos.length === 0">
        <td colspan="4" style="text-align: center">
          No upcomming appointments
        </td>
      </tr>

      <tr
        class="row"
        v-for="(appo, index) in futureAppos"
        :key="index"
        @click="onOpenAppo(appo)"
      >
        <td>
          {{ appo.serviceName }}
          <div class="cate">{{ appo.category }}</div>
        </td>
        <td>
          {{ unixToReadable(appo.date) }}
          <div>({{ unixTimeToReminder(appo.date) }})</div>
        </td>
        <td>
          {{ secsToHours(appo.start) }}
        </td>
        <td>
          <div>{{ (appo.end - appo.start) / 60 }} mins</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// lib
import { computed, ref } from "vue";
import unixToReadable from "@/lib/unixToReadable";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";
import AppoModal from "./appo/Parent.vue";
import getTodayUnixTime from "@/lib/getTodayUnixTime";

export default {
  components: {
    AppoModal,
  },
  props: {
    appos: Array,
  },
  setup(props) {
    // resources
    const appo = ref(null);
    const today = getTodayUnixTime();
    const futureAppos = computed(() =>
      props.appos.filter((appo) => appo.date >= today)
    );

    // INPUT
    const onOpenAppo = (selected) => {
      appo.value = selected;
    };

    const onCancel = () => {
      appo.value = null;
    };

    return {
      appo,
      futureAppos,
      unixTimeToReminder,
      unixToReadable,
      secsToHours,
      onOpenAppo,
      onCancel,
    };
  },
};
</script>


<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  text-align: center;
}
tr {
  border: 1px solid;
}
.row {
  cursor: pointer;
}
.row:hover {
  background: var(--hover);
}
.row:active {
  background: var(--active);
}
#title {
  font-size: 20px;
  text-align: center;
  padding: 5px;
}
.cate {
  font-size: 14px;
}
</style>