<template>
  <div>{{ DELAs }}</div>
</template>
<script>
import getTodayUnixTime from "@/lib/getTodayUnixTime";
// lib
import fetchAvailability from "../apis/fetchAvailability";
export default {
  props: {
    services: Object,
  },
  data() {
    return {
      // resources
      DELAs: null,
    };
  },
  async created() {
    this.DELAs = await fetchAvailability(getTodayUnixTime(), this.services);
    console.log(this.DELAs);
  },
};
</script>
