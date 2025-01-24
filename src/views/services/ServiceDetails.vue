<template>
  <ServiceInfo
    :isFetched="isFetched"
    :serviceInfo="serviceInfo"
    :serviceId="service_id"
  />
  <br />

  <th>Members</th>
  <EmployeeChecker :serviceId="service_id" />
  <br />

  <th>Add-ons</th>
  <ServiceAOSs :AOSs="AOSs" />
  <br />

  <th>Current Length Setting</th>
  <ServiceLengthTable
    v-if="currentLength && Object.keys(currentLength).length"
    :serviceLength="currentLength"
    :serviceId="service_id"
  />
  <td v-else-if="isFetched"><NA /></td>
  <br />

  <th>Future Length Settings</th>
  <td v-if="!futureLengths.length > 0 && isFetched"><NA /></td>

  <ServiceLengthTable
    v-for="(serviceLength, index) in futureLengths"
    :key="index"
    :serviceLength="serviceLength"
    :serviceId="service_id"
  />
  <AddServiceLength :serviceId="service_id" />
</template>

<script>
import fetchServiceDetails from "./apis/fetchServiceDetails";
import unixToReadable from "@/lib/unixToReadable";

import ServiceLengthTable from "./comps/service_length_tables/SL-demo-table.vue";
import NA from "@/components/NotAvailable.vue";
import AddServiceLength from "./comps/AddSL.vue";
import ServiceInfo from "./comps/ServiceInfo.vue";
import ServiceAOSs from "./comps/AOSs/AOSs-demo.vue";
import EmployeeChecker from "./comps/EmployeeChecker.vue";

export default {
  components: {
    ServiceLengthTable,
    NA,
    AddServiceLength,
    ServiceInfo,
    ServiceAOSs,
    EmployeeChecker,
  },
  data() {
    return {
      service_id: null,
      details: {},
      AOSs: {},
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

    // fetch AOSs
    this.AOSs = this.details.AOSs;

    // fetch lengths
    this.lengths = this.details.lengths;
    console.log("first index:", this.lengths[0].effective_from);

    this.currentLength = this.lengths[0];

    this.futureLengths = this.lengths.slice(1);

    // set isFetched
    this.isFetched = true;
  },
};
</script>


<style scoped>
th,
td {
  padding: 10px;
  border-top: 3px var(--xtrans-gray) solid;
  font-size: 19px;
  display: flex;
  text-align: left;
}
</style>