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
      <AddClientBtn />
    </div>
  </div>
  <table>
    <tbody>
      <tr>
        <th>Phone Number</th>
        <th>Client Name</th>
        <th>Account Name</th>
        <th>Last Used</th>
      </tr>
      <tr class="row" v-for="(row, index) in rows" :key="index">
        <td>
          {{ formatPhone(row.phoneNum) }}
        </td>
        <td>
          {{ row.name }}
        </td>
        <td>{{ row.firstName }} {{ row.lastName }}</td>
        <td>
          {{ unixTimeToReminder(row.lastUsed) }}
          <div>
            {{ unixToReadable(row.lastUsed) }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex">
    <button
      id="show"
      class="blueBtn"
      v-if="rows?.length === limit"
      @click="showMore"
    >
      showMore
    </button>
  </div>
</template>
<script>
// lib
import { onMounted, ref } from "vue";
import formatPhone from "@/lib/formatPhone";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import unixToReadable from "@/lib/unixToReadable";
import getTodayUnixTime from "@/lib/getTodayUnixTime";
// apis
import searchContacts from "./apis/searchContacts";
// icon
// comps
import AddClientBtn from "./comps/AddClientBtn.vue";

export default {
  name: "CanceledAppos",
  components: {
    AddClientBtn,
  },
  setup() {
    // resoures
    const query = ref("");
    const rows = ref([]);
    const limit = ref(25);
    const today = getTodayUnixTime();
    // lib

    // INPUT
    const onSearch = async () => {
      rows.value = await searchContacts(query.value, limit.value);
    };

    const showMore = async () => {
      limit.value += 25;
      await onSearch();
    };

    // LIFECYCLE
    onMounted(async () => {
      await onSearch();
    });

    return {
      today,
      query,
      rows,
      formatPhone,
      onSearch,
      unixTimeToReminder,
      unixToReadable,
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
.flexBox {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
}
#search {
  margin-bottom: 10px;
}
#topBox {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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

