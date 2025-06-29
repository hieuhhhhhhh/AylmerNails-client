<template>
  <input
    type="text"
    id="search"
    placeholder="Search..."
    v-model="query"
    @input="onSearchUsers"
  />
  <table>
    <tbody>
      <tr>
        <th class="newCol"></th>
        <th>Account Name</th>
        <th>Phone Number</th>
        <th>Role</th>
        <th>Client Name</th>
        <th>Joined on</th>
      </tr>
      <tr
        class="row"
        v-for="(user, index) in users"
        :key="index"
        @click="toUser(user.userId)"
      >
        <td class="newCol">
          <div class="flexBox">
            <div class="newCell" v-if="user.joinedOn > lastTracked">NEW</div>
            <div class="todayCell" v-if="user.joinedOn >= today">TODAY</div>
          </div>
        </td>

        <td>{{ user.firstName }} {{ user.lastName }}</td>
        <td>{{ formatPhone(user.phoneNum) }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.contactName }}</td>
        <td>{{ unixToReadable(user.joinedOn) }}</td>
      </tr>
    </tbody>
  </table>
  <button v-if="users?.length === limit" @click="showMore">showMore</button>
</template>
<script>
// lib
import { onMounted, ref } from "vue";
import unixToReadable from "@/lib/unixToReadable";
import formatPhone from "@/lib/formatPhone";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import searchUsers from "./apis/searchUsers";
import fetchLastTracked from "./apis/fetchLastTracked";
import { fetchNewUserCount } from "@/components/view-shell/drawer-navigation/apis/connectSocket";
import getTodayUnixTime from "@/lib/getTodayUnixTime";

export default {
  name: "Users-",
  setup() {
    // lib
    const router = useRouter();
    // resoures
    const query = ref("");
    const users = ref([]);
    const lastTracked = ref(null);
    const limit = ref(25);
    const today = getTodayUnixTime();
    // INPUT
    const toUser = (userId) => {
      router.push(`/users/${userId}`);
    };

    const onSearchUsers = async () => {
      users.value = await searchUsers(query.value, limit.value);
    };

    const showMore = async () => {
      limit.value += 25;
      await onSearchUsers();
    };

    // LIFECYCLE
    onMounted(async () => {
      lastTracked.value = await fetchLastTracked();
      await onSearchUsers();
    });

    onBeforeRouteLeave((to, from, next) => {
      fetchNewUserCount();
      next();
    });

    return {
      today,
      query,
      users,
      lastTracked,
      unixToReadable,
      formatPhone,
      toUser,
      onSearchUsers,
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
#title {
  font-size: 25px;
  padding: 10px;
}
#search {
  margin-bottom: 10px;
}
.todayCell {
  padding: 2px;
  background: var(--trans-blue);
  color: white;
  border-radius: 2px;
}
</style>