<template>
  <div>{{ details }}</div>
  <ServiceLengthTable
    v-for="(serviceLength, index) in details.lengths"
    :key="index"
    :serviceLength="serviceLength"
  />
</template>

<script>
import fetchServiceDetails from "./apis/fetchServiceDetails";
import ServiceLengthTable from "./comps/ServiceLengthTable.vue";

export default {
  components: { ServiceLengthTable },
  data() {
    return {
      service_id: null,
      details: {},
    };
  },
  async created() {
    this.service_id = this.$route.params.id;
    this.details = await fetchServiceDetails(this.service_id);
  },
};
</script>
