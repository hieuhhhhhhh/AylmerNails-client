<template>
  <table>
    <colgroup>
      <col style="width: auto" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th>Service</th>
        <th>Employee</th>
        <th>Date</th>
        <th>Time</th>
      </tr>
      <tr
        class="row"
        v-for="(conflict, index) in conflicts"
        :key="index"
        @click="toAppoDetails(conflict.appoDate, conflict.appoId)"
      >
        <td>{{ conflict.serviceName }}</td>
        <td>{{ conflict.empAlias }}</td>
        <td>{{ conflict.appoDate }}</td>
        <td>{{ conflict.appoStart }} - {{ conflict.appoEnd }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// lib
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import fetchServiceLdConflicts from "./apis/fetchServiceLdConflicts";

export default {
  setup() {
    // param from URL
    const route = useRoute();
    const serviceId = route.params.serviceId;
    // router
    const router = useRouter();
    // resources
    const conflicts = ref([]);

    // BUTTONS
    const toAppoDetails = (date, appoId) => {
      console.log("date, appoId", date, appoId);
      router.push(`/calendar/${date}/${appoId}`);
    };

    // LIFECYCLE
    onMounted(async () => {
      // fetch resources
      conflicts.value = await fetchServiceLdConflicts(serviceId);
    });
    return {
      serviceId,
      conflicts,
      toAppoDetails,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
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
</style>