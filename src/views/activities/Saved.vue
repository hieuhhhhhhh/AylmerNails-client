<template>
  <div id="topBox">
    <input
      id="search"
      type="text"
      placeholder="Search..."
      v-model="query"
      @input="onSearch"
    />
    <div>
      <UnsaveAllBtn />
    </div>
  </div>
  <table>
    <tbody>
      <tr>
        <th class="newCol"></th>
        <th>Service</th>
        <th>Employee</th>
        <th>Client</th>
        <th>Booked for</th>
      </tr>
      <tr
        v-for="(appo, index) in appos"
        class="row"
        :key="index"
        @click="toAppo(appo.date, appo.appoId)"
      >
        <td class="newCol">
          <div class="flexBox">
            <div class="newCell" v-if="appo.savedOn > lastTracked">NEW</div>
          </div>
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
  <button v-if="appos?.length === limit" @click="showMore">Show More</button>
</template>
<script>
// lib
import { onMounted, ref } from "vue";
import unixToReadable from "@/lib/unixToReadable";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";
import unixToHours from "@/lib/unixToHours";
import formatPhone from "@/lib/formatPhone";
import { onBeforeRouteLeave, useRouter } from "vue-router";
// apis
import searchSavedAppos from "./apis/searchSavedAppos";
import fetchSavedLastTracked from "./apis/fetchSavedLastTracked";
import { fetchNewSavedCount } from "@/components/view-shell/drawer-navigation/apis/connectSocket";
import unsaveAllAppos from "./apis/unsaveAllAppos";
// comps
import UnsaveAllBtn from "./comps/UnsaveAllBtn.vue";

export default {
  name: "CanceledAppos",
  components: {
    UnsaveAllBtn,
  },
  setup() {
    // resoures
    const query = ref("");
    const appos = ref([]);
    const lastTracked = ref(null);
    const limit = ref(25);
    // lib
    const router = useRouter();

    // INPUT
    const onSearch = async () => {
      appos.value = await searchSavedAppos(query.value, limit.value);
    };

    const onUnsave = async () => {
      const res = await unsaveAllAppos();
      if (res) {
        router.push("/refresh");
      }
    };

    const toAppo = (date, appoId) => {
      router.push(`/calendar/${date}/${appoId}`);
    };

    const showMore = async () => {
      limit.value += 25;
      await onSearch();
    };

    // LIFECYCLE
    onMounted(async () => {
      lastTracked.value = await fetchSavedLastTracked();
      await onSearch();
    });

    onBeforeRouteLeave((to, from, next) => {
      fetchNewSavedCount();
      next();
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
      onSearch,
      toAppo,
      onUnsave,
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
#topBox {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
