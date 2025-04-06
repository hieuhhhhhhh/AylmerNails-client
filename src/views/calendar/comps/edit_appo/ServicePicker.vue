<template>
  <button @click="onStopPicking" class="orangeBtn">
    <FontAwesomeIcon :icon="faLeftLong" /> Back
  </button>
  <div id="flexBox">
    <Category
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
      :onInputService="onInputService"
    />
  </div>

  <SelectAOSOs
    v-if="isOpenAOSs"
    :serviceId="serviceId"
    :onClose="onCancelAOSs"
    :onInputAOSOs="onInputAOSOs"
  />
</template>
<script>
// lib
import { ref, onMounted } from "vue";
import fetchActiveServices from "../../apis/fetchActiveServices";
// comps
import Category from "./Category.vue";
import SelectAOSOs from "./SelectAOSOs.vue";
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

export default {
  components: {
    Category,
    SelectAOSOs,
    FontAwesomeIcon,
  },
  props: {
    date: Number,
    setService: Function,
    onStopPicking: Function,
  },
  setup(props) {
    // status
    const isOpenAOSs = ref(false);
    // resources
    const categories = ref([]);
    // payload
    const serviceId = ref(null);
    const name = ref("");
    const cate = ref("");

    // input handle
    const onInputService = (newId, newName, newCate) => {
      serviceId.value = newId;
      name.value = newName;
      cate.value = newCate;
      isOpenAOSs.value = true;
    };

    const onInputAOSOs = (AOSOs, AOSOsText) => {
      props.setService(
        serviceId.value,
        name.value,
        cate.value,
        AOSOs,
        AOSOsText
      );
    };

    const onCancelAOSs = () => {
      isOpenAOSs.value = false;
    };

    // lifecycle
    onMounted(async () => {
      categories.value = await fetchActiveServices(props.date);
      console.log("categories", categories.value);
    });
    return {
      isOpenAOSs,
      categories,
      serviceId,
      onInputService,
      onInputAOSOs,
      onCancelAOSs,
      faLeftLong,
    };
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
.orangeBtn {
  margin-bottom: 10px;
  font-size: 22px;
  position: sticky;
  top: 10px;
  left: 10px;
  z-index: 10;
}
</style>