<template>
  <Service
    v-for="(serviceId, index) in serviceIds"
    :key="index"
    :serviceId="serviceId"
  />
</template>
<script>
// comps
import Service from "./Service.vue";

export default {
  inject: ["serviceIds"],
  components: {
    Service,
  },
  data() {
    return {
      // products
      services: [],
    };
  },
};
</script>
