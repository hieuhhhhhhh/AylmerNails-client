<template>
  <input
    id="search"
    placeholder="Search..."
    type="text"
    v-model="query"
    @input="onSearchBookings"
  />
  <table>
    <colgroup>
      <col style="width: auto" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th class="newCol"></th>
        <th>Booked by</th>
        <th>Booked on</th>
        <th>Service</th>
        <th>Employee</th>
        <th>Booked for</th>
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
          <div>{{ appo.contactName }}</div>
          {{ formatPhone(appo.phoneNum) }}
        </td>
        <td>
          {{ unixTimeToReminder(appo.bookedTime) }}
          <div>{{ unixToHours(appo.bookedTime) }}</div>
        </td>
        <td>
          {{ appo.serviceName }}
          <div>{{ appo.category }}</div>
        </td>
        <td :style="{ color: appo.color }">{{ appo.empAlias }}</td>
        <td>
          {{ unixToReadable(appo.date) }}
          ({{ unixTimeToReminder(appo.date) }})
          <div>{{ secsToHours(appo.start) }} - {{ secsToHours(appo.end) }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// lib
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import unixToReadable from "@/lib/unixToReadable";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";
import unixToHours from "@/lib/unixToHours";
import formatPhone from "@/lib/formatPhone";
// apis
import searhBookings from "./apis/searchBookings";
import fetchLastTracked from "./apis/fetchLastTracked";
import { fetchNewAppoCount } from "@/components/view-shell/drawer-navigation/apis/connectSocket";

export default {
  name: "Booking-",
  setup() {
    // resources
    const query = ref("");
    const appos = ref([]);
    const limit = ref(50);
    const lastTracked = ref(null);
    // lib
    const router = useRouter();

    // INPUT
    const onSearchBookings = async () => {
      appos.value = await searhBookings(query.value, limit.value);
    };

    const toAppoDetails = (date, appoId) => {
      console.log("date, appoId", date, appoId);
      router.push(`/calendar/${date}/${appoId}`);
    };

    // LIFECYCLE
    onMounted(async () => {
      // call api
      lastTracked.value = await fetchLastTracked();
      await onSearchBookings();
    });

    onBeforeRouteLeave((to, from, next) => {
      fetchNewAppoCount();
      next();
    });

    return {
      query,
      appos,
      lastTracked,
      unixToReadable,
      unixTimeToReminder,
      secsToHours,
      unixToHours,
      formatPhone,
      toAppoDetails,
      onSearchBookings,
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
#search {
  margin-bottom: 10px;
}
</style>