<template>
  <div v-if="category.services.length" id="category">
    <div id="title">{{ category.cate_name }}</div>
    <div v-for="(service, index) in category.services" :key="index">
      <div>
        <input
          id="check"
          type="checkbox"
          :value="service.service_id"
          :checked="service.employee_id && uncheckedAll"
          @change="updateChecked"
          :disabled="!isEditing"
        />
        <label>{{ service.service_name }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category-",
  props: {
    category: Object,
    isEditing: Boolean,
    uncheckedAll: Boolean,
    checkService: Function,
    uncheckService: Function,
  },
  methods: {
    updateChecked(event) {
      const value = event.target.value;
      if (event.target.checked) {
        this.checkService(value);
      } else {
        this.uncheckService(value);
      }
    },
  },
};
</script>

<style scoped>
#check {
  transform: scale(2);
  margin: 10px;
}
#category {
  box-shadow: 0 0 5px var(--shadow-color);
  max-width: 90vw;
  width: 175px;
  border-radius: 5px;
  background-color: var(--background-i2);
  box-sizing: border-box;
  height: fit-content;
}
#title {
  padding: 5px;
  text-align: center;
  font-weight: bold;
  font-size: 19px;
  box-sizing: border-box;
}
#service {
  padding: 8px;
  padding-inline: 15px;
  font-size: 17px;
  box-sizing: border-box;
}
@media (orientation: portrait) {
  #service {
    padding: 13px;
  }
}
</style>