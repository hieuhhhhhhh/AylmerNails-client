<template>
  <div id="category">
    <div id="title">{{ category.category_name ?? "Others" }}</div>
    <div
      id="service"
      v-for="(service, index) in category.services"
      :key="index"
      @click="openServiceDetails(service.service_id)"
    >
      {{ service.service_name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Category-",
  props: {
    category: Object,
  },
  methods: {
    openServiceDetails(service_id) {
      this.$router.push(`/services/details/${service_id}`);
    },
  },
};
</script>

<style scoped>
#category {
  box-shadow: 0 0 5px var(--shadow-color);
  width: 375px;
  max-width: 90vw;
  border-radius: 5px;
  margin: 5px;
  background-color: var(--background-i2);
  box-sizing: border-box;
}
#title {
  padding: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 23px;
  box-sizing: border-box;
}
#service {
  padding: 8px;
  padding-inline: 15px;
  font-size: 17px;
  border-top: 1px solid var(--xtrans-gray);
  box-sizing: border-box;
  cursor: pointer;
}
#service:hover {
  background: var(--hover);
}
#service:active {
  background: var(--active);
}
/* phone view */
@media (orientation: portrait) {
  #service {
    padding: 13px;
  }
  #title {
    padding: 15px;
  }
}
</style>