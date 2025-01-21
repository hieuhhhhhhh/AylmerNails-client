<template>
  <div id="parent" v-show="modalOpen">
    <div id="layout" @click="closeModal">
      <div id="window" @click.stop><slot></slot></div>
    </div>
    <div id="closeIcon" @click="closeModal">
      <FontAwesomeIcon :icon="closeIcon" />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons

export default {
  name: "Modal-",
  props: {
    modalOpen: Boolean,
    setModalOpen: Function,
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      closeIcon: faClose, // Assign the correct icon to a variable
    };
  },
  methods: {
    closeModal() {
      this.setModalOpen(false);
    },
  },
};
</script>

<style scoped>
#layout {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);

  z-index: 25;
}
#window {
  background-color: var(--background-i1);
}
#closeIcon {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 25;
  font-size: 30px;
  border-radius: 30px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  cursor: pointer;
  background-color: var(--background-i2);
}
</style>
