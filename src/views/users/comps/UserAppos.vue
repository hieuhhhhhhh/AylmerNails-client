<template>
  <div id="title">{{ name }}'s Appointments</div>
  <table>
    <tbody>
      <tr>
        <th>Service</th>
        <th>Employee</th>
        <th>Date & Time</th>
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
        <td :style="{ color: appo.color }">
          {{ appo.empAlias }}
        </td>
        <td>
          <div>
            {{ unixToReadable(appo.date) }} ({{
              unixTimeToReminder(appo.date)
            }})
          </div>
          {{ secsToHours(appo.start) }} - {{ secsToHours(appo.end) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// lib
import unixToReadable from "@/lib/unixToReadable";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";
import { useRouter } from "vue-router";

export default {
  props: {
    appos: Array,
    name: String,
  },
  setup() {
    // lib
    const router = useRouter();

    const toAppoDetails = (date, appoId) => {
      router.push(`/calendar/${date}/${appoId}`);
    };
    return {
      unixTimeToReminder,
      unixToReadable,
      secsToHours,
      toAppoDetails,
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
  font-size: 20px;
  text-align: center;
  padding: 5px;
}
.cate {
  font-size: 14px;
}
</style>