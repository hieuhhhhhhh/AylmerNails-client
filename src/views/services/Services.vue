<template>
  <div id="services">
    <div id="title">Services</div>
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
#services {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100vw;
  margin-inline: auto;
  flex-grow: 1;
}
#title {
  margin: 0;
  padding: 5px;
  padding-inline: 15px;
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
  border-radius: 5px;
}
#title:hover,
title:active {
  background-color: var(--background-i2);
  width: fit-content;
  box-shadow: 0 0 5px var(--shadow-color);
}
#cateContainer {
  margin: auto;
  padding: 5px;
  width: fit-content;
}
</style>