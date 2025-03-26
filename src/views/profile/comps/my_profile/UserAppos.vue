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

      <tr
        class="row"
        v-for="(appo, index) in appos"
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
import { ref } from "vue";
import unixToReadable from "@/lib/unixToReadable";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";
import AppoModal from "./appo/Parent.vue";

export default {
  components: {
    AppoModal,
  },
  props: {
    appos: Array,
  },
  setup() {
    // resources
    const appo = ref(null);

    // INPUT
    const onOpenAppo = (selected) => {
      appo.value = selected;
    };

    const onCancel = () => {
      appo.value = null;
    };

    return {
      appo,
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