<template>
  <EmployeeInfo
    v-if="isFetched"
    :inAlias="details.alias"
    :inIntervals="details.intervals"
    :inLastDate="details.last_date"
  />
</template>
<script>
// lib
import fetchEmpDetails from "./apis/fetchEmpDetails";
// comps
import EmployeeInfo from "./comps/EmployeeInfo.vue";
// icons
export default {
  components: {
    EmployeeInfo,
  },
  data() {
    return {
      // status
      isFetched: false,
      // states
      details: {},
    };
  },
  async created() {
    const emp_id = this.$route.params.id;
    this.details = await fetchEmpDetails(emp_id);
    this.isFetched = true;
  },
};
</script>

<style scoped>
table {
  text-align: left;
}
th,
td {
  padding: 10px;
  text-align: left;
}

#note {
  padding: 10px;
  padding-top: 0px;
  font-style: italic;
  color: rgb(184, 121, 3);
}
</style>