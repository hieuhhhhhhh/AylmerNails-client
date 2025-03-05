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

  <th>Duration Settings</th>
  <div id="highlight" v-if="currentLength && Object.keys(currentLength).length">
    <ServiceLengthTable
      :serviceLength="currentLength"
      :serviceId="service_id"
    />
  </div>
  <td v-else-if="isFetched"><NA /></td>
  <br />
  <ServiceLengthTable
    v-for="(serviceLength, index) in futureLengths"
    :key="index"
    :serviceLength="serviceLength"
    :serviceId="service_id"
  />
  <br />

  <AddServiceLength :serviceId="service_id" />
  <th>Questions</th>
  <NA v-if="!AOSs.length && isFetched" />
  <ServiceAOSs :AOSs="AOSs" />
  <br />
  <br />
</template>

<script>
// lib
import fetchServiceDetails from "./apis/fetchServiceDetails";
import unixToReadable from "@/lib/unixToReadable";
// comps
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
      AOSs: [],
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
      cate_name: this.details.cate_name,
      cate_id: this.details.cate_id,
    };

    // fetch AOSs
    this.AOSs = this.details.AOSs;
    console.log("AOSs: ", this.AOSs);

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
#highlight {
  outline: 3px outset;

  width: fit-content;
  height: fit-content;
}
</style>