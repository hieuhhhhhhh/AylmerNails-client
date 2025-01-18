<template>
  <div id="services">
    <MenuBtn />
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
import MenuBtn from "./comps/MenuBtn.vue";

export default {
  name: "Services-",
  components: {
    Category,
    MenuBtn,
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
#services {
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