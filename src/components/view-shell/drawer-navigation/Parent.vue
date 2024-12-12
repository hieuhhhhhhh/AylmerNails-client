<template>
  <div>
    <div id="drawerLayout" v-if="drawerOpen" @click.stop="toggleDrawer" />

    <Drawer v-if="drawerOpen" />
    <IconBtn @click.stop="toggleDrawer" />
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
