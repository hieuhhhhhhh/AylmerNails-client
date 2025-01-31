<template>
  <div>
    <button class="orangeBtn" id="backBtn" @click="closeSelect">
      <FontAwesomeIcon :icon="backIcon" /> Return
    </button>
  </div>

  <div v-if="isFetched" id="flexBox">
    <Category
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
      :onInputServiceId="onInputServiceId"
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

export default {
  props: {
    onInputServiceId: Function,
    onClose: Function,
  },
  components: {
    FontAwesomeIcon,
    Category,
  },
  data() {
    return {
      // icons
      backIcon: faLeftLong,
      // status
      isFetched: false,
      // resources
      categories: [],
    };
  },
  methods: {
    closeSelect() {
      this.onClose();
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
</style>

