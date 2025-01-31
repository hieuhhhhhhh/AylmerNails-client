<template>
  <div>{{ DELAs }}</div>
</template>
<script>
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
  methods: {
    async getAvailability() {
      this.DELAs = await fetchAvailability(this.services);
    },
  },
};
</script>
