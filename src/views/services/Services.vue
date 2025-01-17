<template>
  <div>{{ categories }}</div>
</template>

<script>
import fetchCategorizedServices from "./apis/fetchCategorizedServices";

export default {
  name: "Services-",
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
