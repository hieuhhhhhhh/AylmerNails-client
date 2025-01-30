<template>
  <div v-if="!isAdding" id="preview">
    <div id="note">*These are starting price and minimal time taken</div>

    <Service
      v-for="(serviceId, index) in serviceIds"
      :key="index"
      :serviceId="serviceId"
      :deselectService="deselectService"
    />
    <br />

    <button class="blueBtn" @click="openSelect">
      <FontAwesomeIcon :icon="addIcon" /> Add Service
    </button>
    <br />
  </div>

  <div v-else-if="isFetched">
    <button
      v-if="serviceIds.size"
      class="orangeBtn"
      id="backBtn"
      @click="closeSelect"
    >
      <FontAwesomeIcon :icon="backIcon" /> Return
    </button>
    <div id="flexBox">
      <Category
        v-for="(category, index) in categories"
        :key="index"
        :category="category"
        :selectService="selectService"
      />
    </div>
  </div>
</template>

<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faLeftLong } from "@fortawesome/free-solid-svg-icons";
// lib
import fetchActiveServices from "../../apis/fetchActiveServices";
// comps
import Category from "./Category.vue";
import Service from "./Service.vue";

export default {
  inject: ["onInputServices"],
  components: {
    FontAwesomeIcon,
    Category,
    Service,
  },
  data() {
    return {
      // icons
      addIcon: faPlus,
      backIcon: faLeftLong,
      // status
      isAdding: true,
      isFetched: false,
      // resources
      categories: [],
      // products
      serviceIds: new Set(),
    };
  },
  methods: {
    selectService(id) {
      this.serviceIds.add(id);
      this.onInputServices(this.serviceIds);
      this.isAdding = false;
    },
    deselectService(id) {
      this.serviceIds.delete(id);
      this.onInputServices(this.serviceIds);
    },
    openSelect() {
      this.isAdding = true;
    },
    closeSelect() {
      this.isAdding = false;
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
#preview {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#backBtn {
  position: sticky;
  top: 10px;
  left: 10px;
  z-index: 10;
}
#note {
  padding: 10px;
  padding-top: 0px;
  font-style: italic;
  color: rgb(184, 121, 3);
}
</style>

