<template>
  <div class="warning" v-if="lastDateCC > 0">
    Warning: Availability has {{ lastDateCC }}
    <u>conflicting appointment(s)</u>
  </div>
  <div class="warning" v-if="durationCC > 0">
    Warning: Duration settings has {{ durationCC }}
    <u>conflicting appointment(s)</u>
  </div>
  <ServiceInfo
    :isFetched="isFetched"
    :serviceInfo="serviceInfo"
    :serviceId="service_id"
  />

  <th>Members</th>
  <EmployeeChecker :serviceId="service_id" />
  <br />
  <th>Duration Settings</th>
  <DurationDemo
    v-if="isFetched"
    :serviceId="service_id"
    :duration="duration"
    :empDurations="empDurations"
  />

  <br />
  <br />

  <th>Question List</th>
  <NA v-if="!AOSs.length && isFetched" />
  <ServiceAOSs :AOSs="AOSs" />
  <div id="note">
    *question list can not be edited, recreate the service if you have to change
    it
  </div>
</template>

<script>
// lib
import fetchServiceDetails from "./apis/fetchServiceDetails";
import unixToReadable from "@/lib/unixToReadable";
// comps
import NA from "@/components/NotAvailable.vue";
import ServiceInfo from "./comps/ServiceInfo.vue";
import ServiceAOSs from "./comps/AOSs/AOSs-demo.vue";
import EmployeeChecker from "./comps/EmployeeChecker.vue";
import DurationDemo from "./comps/durations/DurationsDemo.vue";

export default {
  components: {
    NA,
    ServiceInfo,
    ServiceAOSs,
    EmployeeChecker,
    DurationDemo,
  },
  data() {
    return {
      // outcomes
      service_id: null,
      details: {},
      AOSs: [],
      serviceInfo: {},
      duration: null,
      empDurations: [],
      isFetched: false,
      isAddingLength: false,
      durationCC: 0,
      lastDateCC: 0,
    };
  },
  methods: {
    formatDate(unixTime) {
      return unixToReadable(unixTime);
    },
  },
  async created() {
    this.service_id = Number(this.$route.params.id);
    this.details = await fetchServiceDetails(this.service_id);

    // fetch info
    this.serviceInfo = {
      service_id: this.details.service_id,
      name: this.details.name,
      description: this.details.description,
      first_date: this.details.first_date,
      last_date: this.details.last_date,
      cate_name: this.details.cate_name,
      cate_id: this.details.cate_id,
    };

    // fetch AOSs
    this.AOSs = this.details.AOSs;
    console.log("AOSs: ", this.AOSs);

    // fetch durations
    this.duration = this.details.duration;
    this.empDurations = this.details.empDurations;

    // fetch conflicts counts
    this.durationCC = this.details.durationCC;
    this.lastDateCC = this.details.lastDateCC;

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
#note {
  padding: 10px;
  padding-top: 0px;
  color: rgb(184, 121, 3);
}
.warning {
  font-size: 16px;
  color: red;
  cursor: pointer;
}
</style>