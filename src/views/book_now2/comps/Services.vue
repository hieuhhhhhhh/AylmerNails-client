<template>
  <div v-if="!isSelecting" id="flexBox">
    <div id="note">*Below are starting prices and minimal service lengths</div>
    <div id="note">*By default, all technicians are selected</div>

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
  </div>

  <SelectService
    v-else
    :onInputServiceId="onInputServiceId"
    :onClose="closeSelect"
  />
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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
  },
  data() {
    return {
      // icon
      addIcon: faPlus,
      // status
      isSelecting: false,
      // resources
      services: {},
    };
  },
  methods: {
    onInputServiceId(id) {
      if (!this.services[id]) {
        this.services[id] = { serviceId: id, empIds: [], mutated: false };
      }
      this.isSelecting = false;
    },
    openSelect() {
      this.isSelecting = true;
    },
    closeSelect() {
      this.isSelecting = false;
    },
    onRemoveService(id) {
      delete this.services[id];
    },
    onInputEmpIds(serviceId, value) {
      this.services[serviceId].empIds = value;
      this.services[serviceId].mutated = true;
    },
  },
  created() {
    this.services = this.getServices();
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
</style>