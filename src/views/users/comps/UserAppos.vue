<template>
  <div id="title">{{ name }}'s Appointments</div>
  <table>
    <tbody>
      <tr>
        <th>Service</th>
        <th>Employee</th>
        <th>Date & Time</th>
      </tr>

      <tr v-if="futureAppos.length === 0">
        <td colspan="3" style="text-align: center">
          No upcomming appointments
        </td>
      </tr>

      <tr
        class="row"
        v-for="(appo, index) in futureAppos"
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
import getTodayUnixTime from "@/lib/getTodayUnixTime";
import { computed } from "vue";

export default {
  props: {
    appos: Array,
    name: String,
  },
  setup(props) {
    const router = useRouter();
    const today = getTodayUnixTime();

    const toAppoDetails = (date, appoId) => {
      router.push(`/calendar/${date}/${appoId}`);
    };

    const futureAppos = computed(() =>
      props.appos.filter((appo) => appo.date >= today)
    );

    return {
      today,
      unixTimeToReminder,
      unixToReadable,
      secsToHours,
      toAppoDetails,
      futureAppos,
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
