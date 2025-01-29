<template>
  <div v-if="isFetched" id="services">
    <Category
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
    />
  </div>
</template>

<script>
// lib
import fetchActiveServices from "../../apis/fetchActiveServices";
// comps
import Category from "./Category.vue";

export default {
  components: {
    Category,
  },
  data() {
    return {
      // status
      isAdding: false,
      isFetched: false,
      // resources
      categories: [],
    };
  },
  async created() {
    this.categories = await fetchActiveServices();
    this.isFetched = true;
  },
};
</script>

<style scoped>
#services {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
</style>

