<template>
  <div id="ServiceInfo">
    <table>
      <tbody>
        <tr>
          <th>Name:</th>
        </tr>
        <tr>
          <th>Description:</th>
        </tr>
        <tr>
          <th>Available Until:</th>
        </tr>
        <tr>
          <th>Category:</th>
        </tr>
      </tbody>
    </table>

    <div id="duo">
      <button class="redBtn" @click.prevent="onClose">
        <FontAwesomeIcon :icon="cancelIcon" /> Cancel
      </button>
      <button class="greenBtn">
        <FontAwesomeIcon :icon="saveIcon" /> Save Changes
      </button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faCancel } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons

import unixToReadable from "@/lib/unixToReadable";

export default {
  props: {
    onClose: Function,
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      editIcon: faPenToSquare,
      cancelIcon: faCancel,
      saveIcon: faCheck,
    };
  },
  methods: {
    formatDate(unixTime) {
      return unixToReadable(unixTime);
    },
  },
};
</script>

<style scoped>
#ServiceInfo {
  background-color: var(--background-i2);
  width: fit-content;
  padding: 7px;
}
.highlight {
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}

th,
td {
  padding: 10px;
  text-align: left;
}

#duo {
  display: flex;
  gap: 15px;
}
</style>