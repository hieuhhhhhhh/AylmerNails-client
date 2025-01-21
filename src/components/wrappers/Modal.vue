<template>
  <div id="parent">
    <div id="layout" v-show="modalOpen" @click="closeModal" />
    <div id="window"><slot></slot></div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue";
import IconBtn from "./IconBtn.vue";

export default {
  components: { IconBtn, Drawer },
  name: "Modal-",
  data() {
    return {
      modalOpen: false, // Controls the visibility of the Drawer
    };
  },
  methods: {
    closeModal() {
      this.modalOpen = false; // Toggle the Drawer state
    },
  },
};
</script>

<style scoped>
#parent {
  z-index: 15;
}
#layout {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
#window {
}
</style>
