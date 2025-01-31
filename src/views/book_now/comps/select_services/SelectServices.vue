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

    <button class="greenBtn" id="addBtn" @click="openSelect">
      <FontAwesomeIcon :icon="addIcon" /> Add Service
    </button>
    <br />
    <div id="duo">
      <button class="blueBtn" id="leftBtn">
        <FontAwesomeIcon :icon="backIcon" /> Back
      </button>
      <button class="blueBtn" id="rightBtn" @click="navigateNext">
        Next <FontAwesomeIcon :icon="continueIcon" />
      </button>
    </div>
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
import {
  faPlus,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
// lib
import fetchActiveServices from "../../apis/fetchActiveServices";
// comps
import Category from "./Category.vue";
import Service from "./Service.vue";

export default {
  inject: ["onInputServiceIds", "getServiceIds"],
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
      continueIcon: faRightLong,
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
      this.onInputServiceIds(this.serviceIds);
      this.isAdding = false;
    },
    deselectService(id) {
      this.serviceIds.delete(id);
      this.onInputServiceIds(this.serviceIds);
    },
    openSelect() {
      this.isAdding = true;
    },
    closeSelect() {
      this.isAdding = false;
    },
    navigateNext() {
      this.$router.push("/booknow/select_employees");
    },
  },
  async created() {
    this.categories = await fetchActiveServices();
    this.isFetched = true;
    this.serviceIds = this.getServiceIds();
    this.isAdding = !this.serviceIds.size;
  },
};
</script>

<style scoped>
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
#duo {
  display: flex;
  gap: 5px;
  width: 90%;
  justify-content: flex-end;
}
#addBtn {
  border-radius: 30px;
}
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
  font-size: 22px;
}
#note {
  padding: 10px;
  padding-top: 0px;
  font-style: italic;
  color: rgb(184, 121, 3);
}
</style>

