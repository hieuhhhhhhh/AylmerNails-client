<template>
  <div id="main">
    <div id="cateContainer">
      <Category
        v-for="(category, index) in categories"
        :key="index"
        :category="category"
      />
    </div>
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
  },
};
</script>

<style scoped>
#main {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100vw;
  margin-inline: auto;
  flex-grow: 1;
}
#cateContainer {
  margin: auto;
  padding: 5px;
  width: fit-content;
}
</style>