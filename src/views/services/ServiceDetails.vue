<template>
  <div id="parent">
    <DeleteBtn v-if="deletable" :serviceId="service_id" />

    <div class="warning" v-if="lastDateCC > 0" @click="toConflictPage">
      Warning: Availability has {{ lastDateCC }}
      <u>conflicting appointment(s)</u>
    </div>
    <div class="warning" v-if="durationCC > 0" @click="toDurationConflictPage">
      Warning: Duration settings have {{ durationCC }}
      <u>conflicting appointment(s)</u>
    </div>
    <ServiceInfo
      :isFetched="isFetched"
      :serviceInfo="serviceInfo"
      :serviceId="service_id"
    />
    <br />

    <div class="section">Technicians</div>
    <EmployeeChecker :serviceId="service_id" />
    <br />
    <div class="section">Duration Settings</div>

    <DurationDemo
      v-if="isFetched"
      :serviceId="service_id"
      :duration="duration"
      :empDurations="empDurations"
    />

    <br />
    <br />
    <div class="section">Question List</div>

    <NA v-if="!AOSs.length && isFetched" />
    <ServiceAOSs :AOSs="AOSs" />
    <div id="note">
      *question list can not be edited, recreate the service if you have to
      change it
    </div>
  </div>
</template>

<script>
// apis
import fetchServiceDetails from "./apis/fetchServiceDetails";
// lib
import unixToReadable from "@/lib/unixToReadable";
import getTodayUnixTime from "@/lib/getTodayUnixTime";
// comps
import NA from "@/components/NotAvailable.vue";
import ServiceInfo from "./comps/ServiceInfo.vue";
import ServiceAOSs from "./comps/AOSs/AOSs-demo.vue";
import EmployeeChecker from "./comps/EmployeeChecker.vue";
import DurationDemo from "./comps/durations/DurationsDemo.vue";
import DeleteBtn from "./comps/delete_btn/DeleteBtn.vue";

export default {
  components: {
    NA,
    ServiceInfo,
    ServiceAOSs,
    EmployeeChecker,
    DurationDemo,
    DeleteBtn,
  },
  data() {
    return {
      // status
      deletable: false,
      // outcomes
      service_id: null,
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
    toConflictPage() {
      this.$router.push(`/conflicts/service_ld/${this.service_id}`);
    },
    toDurationConflictPage() {
      this.$router.push(`/conflicts/service_duration/${this.service_id}`);
    },
  },
  async created() {
    this.service_id = Number(this.$route.params.id);
    const details = await fetchServiceDetails(this.service_id);
    if (!details) return;

    // fetch info
    this.serviceInfo = {
      service_id: details.service_id,
      name: details.name,
      description: details.description,
      first_date: details.first_date,
      last_date: details.last_date,
      cate_name: details.cate_name,
      cate_id: details.cate_id,
      price: details.price,
      client_can_book: details.client_can_book,
    };

    if (details.last_date) {
      this.deletable = details.last_date < getTodayUnixTime();
    }

    // fetch AOSs
    this.AOSs = details.AOSs;
    console.log("AOSs: ", this.AOSs);

    // fetch durations
    this.duration = details.duration;
    this.empDurations = details.empDurations;

    // fetch conflicts counts
    this.durationCC = details.durationCC;
    this.lastDateCC = details.lastDateCC;

    // set isFetched
    this.isFetched = true;
  },
};
</script>


<style scoped>
.section {
  padding: 10px;
  border-top: 3px var(--xtrans-gray) solid;
  font-size: 18px;
  font-weight: bold;
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
#parent {
  margin-inline: 10px;
  font-size: 16px;
}
</style>