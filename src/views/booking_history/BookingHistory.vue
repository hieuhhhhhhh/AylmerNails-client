<template>
  <table>
    <colgroup>
      <col style="width: auto" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th class="newCol"></th>
        <th>Booked on</th>
        <th>Client</th>
        <th>Service</th>
        <th>Employee</th>
        <th>Booked for</th>
        <th>Time</th>
      </tr>
      <tr
        class="row"
        v-for="(appo, index) in appos"
        :key="index"
        @click="toAppoDetails(appo.date, appo.appoId)"
      >
        <td class="newCol">
          <div class="flexBox">
            <div class="newCell" v-if="appo.bookedTime > lastTracked">NEW</div>
          </div>
        </td>
        <td>
          {{ unixTimeToReminder(appo.bookedTime) }}
          <div>{{ unixToHours(appo.bookedTime) }}</div>
        </td>
        <td>
          <div>{{ appo.contactName }}</div>
          {{ formatPhone(appo.phoneNum) }}
        </td>
        <td>
          {{ appo.serviceName }}
          <div>{{ appo.category }}</div>
        </td>
        <td :style="{ color: appo.color }">{{ appo.empAlias }}</td>
        <td>
          <div>{{ unixTimeToReminder(appo.date) }}</div>
          {{ parseUT(appo.date) }}
        </td>
        <td>
          {{ secsToHours(appo.start) }}
          <div>{{ (appo.end - appo.start) / 60 }} mins</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// lib
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import fetchBookingHistory from "./apis/fetchBookingHistory";
import parseUT from "@/lib/parseUT";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";
import unixToHours from "@/lib/unixToHours";
import { fetchNewAppoCount } from "@/components/view-shell/drawer-navigation/apis/connectSocket";
import formatPhone from "@/lib/formatPhone";

export default {
  setup() {
    // resources
    const appos = ref([]);
    const limit = ref(50);
    const lastTracked = ref(null);
    // lib
    const router = useRouter();

    // INPUT
    const toAppoDetails = (date, appoId) => {
      console.log("date, appoId", date, appoId);
      router.push(`/calendar/${date}/${appoId}`);
    };

    // LIFECYCLE
    onMounted(async () => {
      // call api
      const [newAppos, newLT] = await fetchBookingHistory(limit.value);
      appos.value = newAppos;
      lastTracked.value = newLT;

      // call api via socket
      fetchNewAppoCount();
    });

    return {
      appos,
      lastTracked,
      parseUT,
      unixTimeToReminder,
      secsToHours,
      toAppoDetails,
      unixToHours,
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
.newCol {
  padding: 0px;
  font-size: 8px;
}
.flexBox {
  display: flex;
  justify-content: center;
  align-items: center;
}
.newCell {
  padding: 2px;
  background: var(--trans-red);
  color: white;
  border-radius: 2px;
}
</style>