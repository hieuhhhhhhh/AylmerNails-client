<template>
  <Service
    v-for="(serviceId, index) in serviceIds"
    :key="index"
    :serviceId="serviceId"
    :onInputEmpIds="onInputEmpIds"
  />
  <br />
  <div id="duo">
    <button class="blueBtn" id="leftBtn" @click="navigateBack">
      <FontAwesomeIcon :icon="backIcon" /> Back
    </button>
    <button class="blueBtn" id="rightBtn" @click="navigateNext">
      Next <FontAwesomeIcon :icon="continueIcon" />
    </button>
  </div>
</template>
<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
// comps
import Service from "./Service.vue";

export default {
  inject: ["getServiceIds"],
  components: {
    Service,
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      addIcon: faPlus,
      backIcon: faLeftLong,
      continueIcon: faRightLong,
      // resources
      serviceIds: [],
      // products
      services: {},
    };
  },
  methods: {
    onInputEmpIds(serviceId, empIds) {
      this.services[serviceId].employeeIds = empIds;
    },
    commitServices() {},
    navigateBack() {
      this.$router.push("/booknow/select_services");
    },
    navigateNext() {
      const services = Object.values(this.services);
      for (let s of services) {
        if (!s.employeeIds.length) {
          alert("Please select at least one technician for every service");
          return;
        }
      }
      this.$router.push("/booknow/select_time");
    },
  },
  created() {
    this.serviceIds = this.getServiceIds();
    if (!this.serviceIds.size) {
      this.navigateBack();
    }
    this.serviceIds.forEach(
      (id) => (this.services[id] = { service_id: id, employeeIds: [] })
    );
  },
};
</script>

<style scoped>
#duo {
  display: flex;
  gap: 5px;
  width: 90%;
  justify-content: flex-end;
}
#rightBtn {
  font-size: 23px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
#leftBtn {
  font-size: 23px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
</style>