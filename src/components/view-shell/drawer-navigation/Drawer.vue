<template>
  <div id="Drawer" :class="{ open: isOpen }">
    <DrawerContent @click="closeDrawer" />
  </div>
</template>

<script>
import DrawerContent from "./DrawerContent.vue";

export default {
  components: { DrawerContent },
  name: "Drawer-",
  props: {
    isOpen: Boolean,
  },
  methods: {
    closeDrawer() {
      // Emit the event to update the drawerOpen state in the parent
      this.$emit("update:drawerOpen", false); // Pass 'false' to close the drawer
    },
  },
};
</script>

<style scoped>
#Drawer {
  position: fixed;
  top: 0;
  left: -300px; /* initial position */
  width: 300px;
  max-width: 75vw;
  height: 100%;
  background: var(--background-i2);
  padding-top: 60px;
  transition: left 0.15s ease-out; /* add transition effect */
}

#Drawer.open {
  left: 0; /* new position when open */
}
</style>
