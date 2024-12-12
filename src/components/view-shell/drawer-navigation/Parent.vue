<template>
  <div>
    <IconBtn @click="toggleDrawer" />
    <Drawer v-if="drawerOpen" />
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
