<template>
  <div>This is Calendar</div>
  <div>{{ employees }}</div>
</template>

<script>
import getTodayUnixTime from "@/lib/getTodayUnixTime";
import fetchDailyAppos from "./apis/fetchDailyAppos";

export default {
  name: "Calendar-",
  data() {
    return {
      // resources
      employees: [],
    };
  },
  async created() {
    this.employees = await fetchDailyAppos(getTodayUnixTime());
  },
};
</script>
