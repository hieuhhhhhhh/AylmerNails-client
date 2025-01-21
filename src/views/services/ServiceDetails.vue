<template>
  <ServiceInfo :isFetched="isFetched" :serviceInfo="serviceInfo" />

  <th>Current Length Setting:</th>

  <ServiceLengthTable
    v-if="currentLength && Object.keys(currentLength).length"
    :serviceLength="currentLength"
  />
  <td v-else-if="isFetched"><NA /></td>
  <br />
  <th>Future Length Settings:</th>
  <td v-if="!futureLengths.length > 0 && isFetched"><NA /></td>

  <ServiceLengthTable
    v-for="(serviceLength, index) in futureLengths"
    :key="index"
    :serviceLength="serviceLength"
  />
  <AddServiceLength />
</template>

<script>
import fetchServiceDetails from "./apis/fetchServiceDetails";
import ServiceLengthTable from "./comps/ServiceLengthTable.vue";
import unixToReadable from "@/lib/unixToReadable";
import getTodayUnixTime from "@/lib/getTodayUnixTime";
import NA from "@/components/NotAvailable.vue";
import AddServiceLength from "./comps/AddServiceLength.vue";
import ServiceInfo from "./comps/ServiceInfo.vue";

export default {
  components: {
    ServiceLengthTable,
    NA,
    AddServiceLength,
    ServiceInfo,
  },
  data() {
    return {
      service_id: null,
      details: {},
      serviceInfo: {},
      futureLengths: [],
      currentLength: {},
      isFetched: false,
      isAddingLength: false,
    };
  },
  methods: {
    formatDate(unixTime) {
      return unixToReadable(unixTime);
    },
  },
  async created() {
    this.service_id = this.$route.params.id;
    this.details = await fetchServiceDetails(this.service_id);
    console.log(this.details);
    // fetch info
    this.serviceInfo = {
      service_id: this.details.service_id,
      name: this.details.name,
      description: this.details.description,
      last_date: this.details.last_date,
    };

    // fetch lengths
    this.lengths = this.details.lengths;
    console.log(this.lengths[0]);

    for (let i = 0; i < this.lengths.length; i++) {
      const effective_from = this.lengths[i].effective_from;
      const today = getTodayUnixTime();
      if (effective_from <= today) {
        this.currentLength = this.lengths[i];
      } else {
        this.futureLengths = this.lengths.slice(i);
        break;
      }
    }

    // set isFetched
    this.isFetched = true;
  },
};
</script>


<style scoped>
th,
td {
  padding: 10px;
  text-align: left;
}
</style>