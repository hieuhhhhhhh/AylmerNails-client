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
      <tr
        v-for="(appo, index) in appos"
        class="row"
        :key="index"
        @click="toDate(appo.date)"
      >
        <td class="newCol">
          <div class="flexBox">
            <div class="newCell" v-if="appo.cancelTime > lastTracked">NEW</div>
            <div class="todayCell" v-if="appo.cancelTime >= today">TODAY</div>
          </div>
        </td>
        <td>
          {{ formatPhone(appo.canceler.phoneNum) }}
          <div>{{ appo.canceler.contactName }}</div>

          <div v-if="appo.canceler.profileName != appo.canceler.contactName">
            ({{ appo.canceler.profileName }})
          </div>
        </td>
        <td>
          {{ unixTimeToReminder(appo.cancelTime) }}
          <div>
            {{ unixToReadable(appo.cancelTime) }}
          </div>
          <div>{{ unixToHours(appo.cancelTime) }}</div>
        </td>
        <td>
          {{ appo.serviceName }}
          <div>{{ appo.category }}</div>
        </td>
        <td :style="{ color: appo.color }">{{ appo.empAlias }}</td>
        <td>
          <div>{{ formatPhone(appo.phoneNumber) }}</div>
          {{ appo.contactName }}
        </td>
        <td>
          {{ unixTimeToReminder(appo.date) }}
          <div>
            {{ unixToReadable(appo.date) }}
          </div>
          <div>{{ secsToHours(appo.start) }} - {{ secsToHours(appo.end) }}</div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex">
    <button
      id="show"
      class="blueBtn"
      v-if="appos?.length === limit"
      @click="showMore"
    >
      Show More
    </button>
  </div>
</template>
<script>
// lib
import { onMounted, ref } from "vue";
import unixToReadable from "@/lib/unixToReadable";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";
import unixToHours from "@/lib/unixToHours";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import formatPhone from "@/lib/formatPhone";
import getTodayUnixTime from "@/lib/getTodayUnixTime";
// apis
import searchCanceledAppos from "./apis/searchCanceledAppos";
import fetchLastTracked from "./apis/fetchCanceledLastTracked";
import { fetchNewCanceledCount } from "@/components/view-shell/drawer-navigation/apis/connectSocket";

export default {
  name: "CanceledAppos",
  setup() {
    // resoures
    const query = ref("");
    const appos = ref([]);
    const lastTracked = ref(null);
    const limit = ref(25);
    const today = getTodayUnixTime();
    // lib
    const router = useRouter();

    // INPUT
    const onSearchCanceled = async () => {
      appos.value = await searchCanceledAppos(query.value, limit.value);
    };

    const toDate = (date) => {
      router.push(`/calendar/${date}`);
    };

    const showMore = async () => {
      limit.value += 25;
      await onSearchCanceled();
    };

    // LIFECYCLE
    onMounted(async () => {
      lastTracked.value = await fetchLastTracked();
      await onSearchCanceled();
    });

    onBeforeRouteLeave((to, from, next) => {
      fetchNewCanceledCount();
      next();
    });

    return {
      today,
      query,
      appos,
      lastTracked,
      unixToReadable,
      unixTimeToReminder,
      unixToHours,
      secsToHours,
      formatPhone,
      onSearchCanceled,
      toDate,
      showMore,
      limit,
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
  flex-direction: column;
  gap: 5px;
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
.row:hover {
  background: var(--hover);
}
.row:active {
  background: var(--active);
}
.row {
  cursor: pointer;
}
.todayCell {
  padding: 2px;
  background: var(--trans-blue);
  color: white;
  border-radius: 2px;
}
#show {
  padding: 10px 30px;
  margin: 10px;
  border-radius: 20px;
}
.flex {
  display: flex;
  justify-content: center;
}
</style>
