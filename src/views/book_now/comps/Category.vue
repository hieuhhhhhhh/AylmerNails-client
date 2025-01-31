<template>
  <div id="category">
    <div id="title">{{ category.cate_name }}</div>
    <div
      id="service"
      v-for="(service, index) in category.services"
      :key="index"
      @click="onSelectService(service.service_id)"
    >
      {{ service.service_name }}
    </div>
  </div>
</template>

<script>
// lib
import unixToReadable from "@/lib/unixToReadable";

export default {
  name: "Category-",
  props: {
    category: Object,
    onInputServiceId: Function,
  },
  methods: {
    formatDate(unixTime) {
      return unixToReadable(unixTime);
    },
    onSelectService(id) {
      this.onInputServiceId(id);
    },
  },
};
</script>

<style scoped>
#category {
  box-shadow: 0 0 5px var(--shadow-color);
  max-width: 90vw;
  width: 350px;
  border-radius: 5px;
  background-color: var(--background-i2);
  box-sizing: border-box;
  height: fit-content;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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