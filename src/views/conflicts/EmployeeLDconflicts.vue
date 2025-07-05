<template>
  <div id="title">Employee Availability Conflicts</div>

  <table>
    <colgroup>
      <col style="width: auto" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th>Client</th>
        <th>Service</th>
        <th>Time</th>
      </tr>
      <tr
        class="row"
        v-for="(conflict, index) in conflicts"
        :key="index"
        @click="toAppoDetails(conflict.appoDate, conflict.appoId)"
      >
        <td>
          {{ conflict.contactName }}
          <div>{{ formatPhone(conflict.phoneNum) }}</div>
        </td>
        <td>
          {{ conflict.serviceName }}
          <div>{{ conflict.category }}</div>
        </td>
        <td>
          {{ unixToReadable(conflict.appoDate) }} ({{
            unixTimeToReminder(conflict.appoDate)
          }})
          <div>
            {{ secsToHours(conflict.appoStart) }} -
            {{ secsToHours(conflict.appoEnd) }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// lib
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import fetchEmployeeLdConflicts from "./apis/fetchEmployeeLdConflicts";

import formatPhone from "@/lib/formatPhone";
import unixToReadable from "@/lib/unixToReadable";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";

export default {
  setup() {
    // param from URL
    const route = useRoute();
    const empId = route.params.empId;
    // router
    const router = useRouter();
    // resources
    const conflicts = ref([]);

    // BUTTONS
    const toAppoDetails = (date, appoId) => {
      console.log("date, appoId", date, appoId);
      router.push(`/calendar/${date}/${appoId}`);
    };

    // LIFECYCLE
    onMounted(async () => {
      // fetch resources
      conflicts.value = await fetchEmployeeLdConflicts(empId);
    });
    return {
      empId,
      conflicts,
      toAppoDetails,
      unixTimeToReminder,
      secsToHours,
      unixToReadable,
      formatPhone,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
th,
td {
  padding-top: 10px;
  padding-bottom: 10px;

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
  font-size: 25px;
  padding: 10px;
}
</style>