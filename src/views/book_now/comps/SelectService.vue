<template>
  <div>
    <button
      v-if="isReturnable"
      class="orangeBtn"
      id="backBtn"
      @click="closeSelect"
    >
      <FontAwesomeIcon :icon="backIcon" /> Back
    </button>
  </div>
  <div id="note">
    Please note that our website is intended for individual appointments
    <br />
    Contact us for multiple people appointments
    <br />
    Step 1: Select your service
  </div>

  <div v-if="isFetched" id="flexBox">
    <Category
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
      :onInputServiceId="onInputServiceId"
    />
  </div>

  <div v-if="openAOSs">
    <SelectAOSOs
      :serviceId="serviceId"
      :onClose="closeAOSOs"
      :onInputAOSOs="onInputAOSOs"
    />
  </div>
</template>

<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
// comps
import Category from "./Category.vue";
// lib
import fetchActiveServices from "../apis/fetchActiveServices";
import SelectAOSOs from "./SelectAOSOs.vue";

export default {
  props: {
    isReturnable: Boolean,
    onInputService: Function,
    onClose: Function,
  },
  components: {
    FontAwesomeIcon,
    Category,
    SelectAOSOs,
  },
  data() {
    return {
      // icons
      backIcon: faLeftLong,
      // status
      isFetched: false,
      openAOSs: false,
      // resources
      categories: [],
      // outcome
      serviceId: null,
    };
  },
  methods: {
    closeSelect() {
      this.onClose();
    },
    onInputServiceId(serviceId) {
      this.serviceId = serviceId;
      this.openAOSs = true;
    },
    closeAOSOs() {
      this.openAOSs = false;
    },
    onInputAOSOs(AOSOs) {
      this.onInputService(this.serviceId, AOSOs);
    },
  },
  async created() {
    this.categories = await fetchActiveServices();
    this.isFetched = true;
  },
};
</script>

<style scoped>
#flexBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

#backBtn {
  position: sticky;
  top: 10px;
  left: 10px;
  z-index: 10;
  font-size: 22px;
}
#note {
  padding: 10px;
  padding-top: 0px;
  color: rgb(184, 121, 3);
  text-align: center;
}
</style>

