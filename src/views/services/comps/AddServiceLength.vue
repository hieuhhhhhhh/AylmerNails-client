<template>
  <div v-if="isAddingLength">
    <h2>New Service Length</h2>
  </div>
  <button v-if="!isAddingLength" class="blueBtn" @click="openLengthInput">
    <FontAwesomeIcon :icon="plusIcon" /> Add New Length Setting
  </button>
  <div v-else id="duo">
    <button class="redBtn" @click="closeLengthInput">
      <FontAwesomeIcon :icon="cancelIcon" /> Cancel
    </button>
    <button class="greenBtn" @click="closeLengthInput">
      <FontAwesomeIcon :icon="saveIcon" /> Add
    </button>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faCancel } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      isAddingLength: false,
      plusIcon: faPlus,
      cancelIcon: faCancel,
      saveIcon: faCheck,
    };
  },
  methods: {
    openLengthInput() {
      this.isAddingLength = true;
    },
    closeLengthInput() {
      this.isAddingLength = false;
    },
  },
};
</script>

<style scoped>
#duo {
  display: flex;
  gap: 15px;
}
</style>