<template>
  <div id="title">My Appointments</div>
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
        @click="toAppoDetails(appo.date, appo.appoId)"
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
import { computed } from "vue";
import unixToReadable from "@/lib/unixToReadable";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";
import { useRouter } from "vue-router";
// pinia
import { useMyProfile } from "@/stores/myProfile";

export default {
  props: {
    appos: Array,
  },
  setup() {
    // lib
    const router = useRouter();
    // pinia states
    const MPstore = useMyProfile();
    const role = computed(() => MPstore.role);
    const validRoles = ["admin", "developer"];
    const isRoleValid = computed(() => validRoles.includes(role.value));

    const toAppoDetails = (date, appoId) => {
      router.push(`/calendar/${date}/${appoId}`);
    };

    return {
      unixTimeToReminder,
      unixToReadable,
      secsToHours,
      toAppoDetails,
      isRoleValid,
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