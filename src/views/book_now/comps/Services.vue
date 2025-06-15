<template>
  <div v-show="!isSelecting" id="flexBox">
    <div id="note">Step 2: Use checkboxes to select technicians</div>

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
        Continue <FontAwesomeIcon :icon="continueIcon" />
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
import { ref, onMounted, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
// comps
import SelectService from "./SelectService.vue";
import Service from "./Service.vue";
import { useRoute, useRouter } from "vue-router";

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
  setup(props) {
    const addIcon = faPlus;
    const backIcon = faLeftLong;
    const continueIcon = faRightLong;
    const router = useRouter();
    const route = useRoute();

    const isSelecting = ref(false);
    const isReturnable = ref(false);
    const services = ref({});

    const onInputService = (id, AOSOs, name) => {
      if (!services.value[id]) {
        services.value[id] = {
          serviceId: id,
          empIds: [],
          AOSOs: AOSOs,
          serviceName: name,
        };
      }
      isReturnable.value = true;

      isSelecting.value = false;
      router.push(`/booknow/1`);
      props.resetPage2();
    };

    const openSelect = () => {
      isSelecting.value = true;
      router.push(`/booknow/0`);
    };

    const closeSelect = () => {
      router.back();
    };

    const onRemoveService = (id) => {
      delete services.value[id];
      props.resetPage2();
    };

    const onInputEmpIds = (serviceId, ids, aliases) => {
      services.value[serviceId].empIds = ids;
      services.value[serviceId].empAliases = aliases;

      props.resetPage2();
    };

    const onSubmit = () => {
      if (!Object.keys(services.value).length) {
        isSelecting.value = true;
        return;
      }
      props.onNavigateNext();
    };

    onMounted(() => {
      services.value = props.getServices();
      if (!Object.keys(services.value).length) {
        isSelecting.value = true;
      }
    });

    // DEPENDENCIES
    watch(
      () => route.params.page,
      (value) => {
        if (value == 1) {
          isSelecting.value = false;
          return;
        }

        if (value == 0) {
          isSelecting.value = true;
          return;
        }
      }
    );
    return {
      addIcon,
      backIcon,
      continueIcon,
      isSelecting,
      isReturnable,
      services,
      onInputService,
      openSelect,
      closeSelect,
      onRemoveService,
      onInputEmpIds,
      onSubmit,
    };
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
  color: rgb(184, 121, 3);
}
#rightBtn {
  padding-inline: 15px;
  font-size: 20px;
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
