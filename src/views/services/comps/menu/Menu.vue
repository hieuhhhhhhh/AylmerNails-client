<template>
  <div id="menu">
    <MenuTitle :title="title" />
    <div
      class="options"
      v-for="(option, index) in options"
      :key="index"
      @click="onOptionSelected(option)"
    >
      {{ option.text }}
    </div>
  </div>
</template>

<script>
import MenuTitle from "./MenuTitle.vue";

export default {
  props: {
    options: Array,
    title: String,
    onOptionSelected: Function,
  },
  name: "Menu-",
  components: {
    MenuTitle,
  },
};
</script>


<style scoped>
#menu {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  background-color: var(--background-i2);
  width: fit-content;
  box-shadow: 0 0 5px var(--shadow-color);
}
#title {
  font-size: 22px;
  font-weight: bold;
}
.options {
  border-top: 1px solid var(--xtrans-gray);
  font-size: 17px;

  padding: 8px;
  padding-inline: 15px;
  cursor: pointer;
}
</style>