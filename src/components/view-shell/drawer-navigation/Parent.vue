<template>
  <div id="main">
    <div id="layout" v-show="drawerOpen" @click="toggleDrawer" />
    <Drawer :isOpen="drawerOpen" @update:drawerOpen="updateDrawerState" />
    <IconBtn @click="toggleDrawer" />
  </div>
</template>

<script>
import Drawer from "./Drawer.vue";
import IconBtn from "./IconBtn.vue";

export default {
  components: { IconBtn, Drawer },
  name: "DrawerNav",
  data() {
    return {
      drawerOpen: false, // Controls the visibility of the Drawer
    };
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen; // Toggle the Drawer state
    },
    updateDrawerState(newState) {
      this.drawerOpen = newState; // Update the drawerOpen state
    },
  },
};
</script>

<style scoped>
#main {
  z-index: 15;
}
#layout {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
