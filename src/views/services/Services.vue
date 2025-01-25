<template>
  <div id="services">
    <Category
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
    />
  </div>
  <div id="flexBox">
    <button class="blueBtn" id="add" @click="addCate">
      <FontAwesomeIcon :icon="plusIcon" /> Add Category
    </button>
  </div>
</template>

<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// lib
import fetchCategorizedServices from "./apis/fetchCategorizedServices";
// comps
import Category from "./comps/Category.vue";

export default {
  name: "Services-",
  components: {
    Category,
    FontAwesomeIcon,
  },
  data() {
    return {
      categories: [],
      plusIcon: faPlus,
    };
  },
  async created() {
    this.categories = await fetchCategorizedServices();
    console.log("categories: ", this.categories);
  },
  methods: {
    addCate() {
      this.$router.push(`/services/add_category`);
    },
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
#flexBox {
  display: flex;
  justify-content: center;
}
#add {
  margin: 10px;
}
</style>