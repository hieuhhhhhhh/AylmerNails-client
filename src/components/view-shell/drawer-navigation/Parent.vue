<template>
  <div>
    <div id="drawerLayout" v-show="drawerOpen" @click="toggleDrawer" />
    <!-- Pass the drawerOpen as a prop to the Drawer component -->
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
#drawerLayout {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
