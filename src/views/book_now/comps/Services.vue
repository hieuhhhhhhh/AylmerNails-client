<template>
  <div v-show="!isSelecting" id="flexBox">
    <div id="note">*Use checkboxes to select technicians</div>

    <Service
      v-for="(service, index) in services"
      :key="index"
      :service="service"
      :onRemoveService="onRemoveService"
      :onInputEmpIds="onInputEmpIds"
    />
    <br />
    <button class="greenBtn" id="addBtn" @click="openSelect">
      <FontAwesomeIcon :icon="addIcon" /> Add Service
    </button>
    <br />

    <div id="duo">
      <button class="blueBtn" id="rightBtn" @click="onSubmit">
        Next <FontAwesomeIcon :icon="continueIcon" />
      </button>
    </div>
  </div>

  <div v-show="isSelecting">
    <SelectService
      :onInputService="onInputService"
      :onClose="closeSelect"
      :isReturnable="isReturnable"
    />
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
// comps
import SelectService from "./SelectService.vue";
import Service from "./Service.vue";

export default {
  name: "BookNowParent",
  components: {
    SelectService,
    Service,
    FontAwesomeIcon,
  },
  props: {
    getServices: Function,
    onNavigateNext: Function,
    resetPage2: Function,
  },
  data() {
    return {
      // icons
      addIcon: faPlus,
      backIcon: faLeftLong,
      continueIcon: faRightLong,
      // status
      isSelecting: false,
      isReturnable: false,
      // resources
      services: {},
    };
  },
  methods: {
    onInputService(id, AOSOs) {
      if (!this.services[id]) {
        this.services[id] = { serviceId: id, empIds: [], AOSOs: AOSOs };
      }
      this.isReturnable = true;
      this.isSelecting = false;
      this.resetPage2();
    },
    openSelect() {
      this.isSelecting = true;
    },
    closeSelect() {
      this.isSelecting = false;
    },
    onRemoveService(id) {
      delete this.services[id];
      this.resetPage2();
    },
    onInputEmpIds(serviceId, value) {
      this.services[serviceId].empIds = value;
      this.resetPage2();
    },
    onSubmit() {
      this.onNavigateNext();
    },
  },
  created() {
    this.services = this.getServices();
    if (!Object.keys(this.services).length) {
      this.isSelecting = true;
    }
  },
};
</script>
<style scoped>
#flexBox {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#addBtn {
  border-radius: 30px;
}
#note {
  padding: 10px;
  padding-top: 0px;
  font-style: italic;
  color: rgb(184, 121, 3);
}
#rightBtn {
  padding: 10px;
  font-size: 25px;
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
</style>