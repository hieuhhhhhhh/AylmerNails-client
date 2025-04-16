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
      <button class="orangeBtn" id="unsave">Add Phone Number</button>
    </div>
  </div>
  <table>
    <tbody>
      <tr>
        <th class="newCol"></th>
        <th>Phone Number</th>
        <th>Banned On</th>
        <th>Client Name</th>
        <th>Account Name</th>
      </tr>
      <tr class="row" v-for="(row, index) in rows" :key="index">
        <td class="newCol">
          <div class="flexBox">
            <div class="newCell" v-if="row.bannedOn > lastTracked">NEW</div>
          </div>
        </td>
        <td>
          {{ formatPhone(row.phoneNum) }}
        </td>
        <td>
          {{ unixToReadable(row.bannedOn) }}
          <div>{{ unixToHours(row.bannedOn) }}</div>
        </td>
        <td>
          {{ row.contactName }}
        </td>
        <td>{{ row.firstName }} {{ row.lastName }}</td>
        <td class="btn">
          <button class="blueBtn" @click="onUnban(row.phoneNum)">
            Unblacklist
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
// lib
import { onMounted, ref } from "vue";
import formatPhone from "@/lib/formatPhone";
import unixToReadable from "@/lib/unixToReadable";
import unixToHours from "@/lib/unixToHours";
// apis
import searchBlacklist from "./apis/searchBlacklist";
import fetchBlacklistLastTracked from "./apis/fetchBlacklistLastTracked";
import banUnbanPhoneNum from "./apis/banUnbanPhoneNum";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { fetchNewBlacklistCount } from "@/components/view-shell/drawer-navigation/apis/connectSocket";

export default {
  name: "CanceledAppos",
  setup() {
    // resoures
    const query = ref("");
    const rows = ref([]);
    const lastTracked = ref(null);
    const limit = ref(50);
    // lib
    const router = useRouter();

    // INPUT
    const onSearch = async () => {
      rows.value = await searchBlacklist(query.value, limit.value);
    };

    const onUnban = async (phoneNum) => {
      const res = await banUnbanPhoneNum(phoneNum, false);
      if (res) {
        router.push("/refresh");
      }
    };

    // LIFECYCLE
    onMounted(async () => {
      lastTracked.value = await fetchBlacklistLastTracked();
      await onSearch();
    });

    onBeforeRouteLeave((to, from, next) => {
      fetchNewBlacklistCount();
      next();
    });

    return {
      query,
      rows,
      lastTracked,
      formatPhone,
      onSearch,
      unixToReadable,
      unixToHours,
      onUnban,
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
.btn {
  margin: 0;
  width: 20px;
}
button {
  font-size: 12px;
}
#topBox {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
#unsave {
  font-size: 13px;
}
</style>

