<template>
  <div
    id="parent"
    ref="parent"
    @focus="handleFocus"
    @blur="handleBlur"
    tabindex="0"
  >
    <MenuTitle :title="getTitle()" />
    <Menu
      v-if="menuOpen"
      :title="getTitle()"
      :options="options"
      :onOptionSelected="
        (option) => {
          $refs.parent.blur();
          this.$router.push(option.path);
        }
      "
    />
  </div>
</template>

<script>
import MenuTitle from "./MenuTitle.vue";
import Menu from "./Menu.vue";

export default {
  props: {
    options: Array,
    getTitle: Function,
  },
  name: "Parent-",

  components: {
    MenuTitle,
    Menu,
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    handleFocus() {
      this.menuOpen = true;
    },
    handleBlur() {
      this.menuOpen = false;
    },
  },
};
</script>

<style scoped>
#parent {
  position: relative;
  width: fit-content;
}
#parent:focus,
#parent:hover {
  border-radius: 5px;

  background-color: var(--background-i2);
  width: fit-content;
  box-shadow: 0 0 5px var(--shadow-color);
}
</style>
