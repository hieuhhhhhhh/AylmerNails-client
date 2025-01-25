<template>
  <div id="services">
    <Category
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
    />
  </div>
</template>

<script>
import fetchCategorizedServices from "./apis/fetchCategorizedServices";
import Category from "./comps/Category.vue";

export default {
  name: "Services-",
  components: {
    Category,
  },
  data() {
    return {
      categories: [],
    };
  },
  async created() {
    this.categories = await fetchCategorizedServices();
    console.log("categories: ", this.categories);
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