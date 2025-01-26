<template>
  <div
    id="parent"
    ref="parent"
    @focus="handleFocus"
    @blur="handleBlur"
    tabindex="0"
  >
    <MenuTitle :title="title" :style="{ cursor: 'pointer' }" />
    <Menu
      v-if="menuOpen"
      :title="title"
      :options="options"
      :onOptionSelected="
        (option) => {
          $refs.parent.blur();

          // navigate to the new child route
          this.$router.push(option.path);
        }
      "
      :onCloseMenu="
        () => {
          $refs.parent.blur();
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
      title: "",
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
    setTitle() {
      this.title = this.getTitle();
    },
  },
  created() {
    // set title on component creation
    this.setTitle();
  },
  watch: {
    // Watch for route changes and update the title
    $route: "setTitle",
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
