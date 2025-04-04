<template>
  <input
    id="search"
    type="text"
    placeholder="Search..."
    v-model="query"
    @input="onSearchCanceled"
  />
  <table>
    <tbody>
      <tr>
        <th class="newCol"></th>
        <th>Canceled by</th>
        <th>Canceled on</th>
        <th>Service</th>
        <th>Employee</th>
        <th>Client</th>
        <th>Booked for</th>
      </tr>
      <tr v-for="(appo, index) in appos" :key="index">
        <td class="newCol">
          <div class="flexBox">
            <div class="newCell" v-if="appo.cancelTime > lastTracked">NEW</div>
          </div>
        </td>
        <td>
          <div>{{ appo.canceler.firstName }} {{ appo.canceler.lastName }}</div>
          {{ formatPhone(appo.canceler.phoneNum) }}
        </td>
        <td>
          {{ unixTimeToReminder(appo.cancelTime) }}
          <div>{{ unixToHours(appo.cancelTime) }}</div>
        </td>
        <td>
          {{ appo.serviceName }}
          <div>{{ appo.category }}</div>
        </td>
        <td :style="{ color: appo.color }">{{ appo.empAlias }}</td>
        <td>
          {{ appo.contactName }}
          <div>{{ formatPhone(appo.phoneNumber) }}</div>
        </td>
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
import { onMounted, ref } from "vue";
import searchCanceledAppos from "./apis/searchCanceledAppos";
import fetchLastTracked from "./apis/fetchLastTracked";
import unixToReadable from "@/lib/unixToReadable";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";
import unixToHours from "@/lib/unixToHours";

import formatPhone from "@/lib/formatPhone";

export default {
  name: "CanceledAppos",
  setup() {
    // resoures
    const query = ref("");
    const appos = ref([]);
    const lastTracked = ref(null);
    const limit = ref(50);

    // INPUT
    const onSearchCanceled = async () => {
      appos.value = await searchCanceledAppos(query.value, limit.value);
    };

    // LIFECYCLE
    onMounted(async () => {
      lastTracked.value = await fetchLastTracked();
      await onSearchCanceled();
    });

    return {
      query,
      appos,
      lastTracked,
      unixToReadable,
      unixTimeToReminder,
      unixToHours,
      secsToHours,
      formatPhone,
      onSearchCanceled,
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
