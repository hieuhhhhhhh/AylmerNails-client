<template>
  <div id="main">
    <div id="title">{{ category.category_name ?? "Others" }}</div>
    <div
      id="service"
      v-for="(service, index) in category.services"
      :key="index"
    >
      {{ service.service_name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Category-",
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
#main {
  box-shadow: 0 0 5px var(--shadow-color);
  width: 290px;
  max-width: 80vw;
  border-radius: 5px;
  margin: 5px;
  padding: 0;
  padding-inline: 10px;
  background-color: var(--background-i2);
}
#title {
  padding: 15px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}
#service {
  padding: 10px;
  font-size: 15px;
  border-top: 1px solid var(--xtrans-gray);
}
</style>