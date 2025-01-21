<template>
  <table>
    <tbody>
      <tr>
        <th>Name:</th>
        <td class="highlight">{{ serviceInfo.name }}</td>
      </tr>
      <tr>
        <th>Description:</th>
        <td>{{ serviceInfo.description }}</td>
      </tr>
      <tr>
        <th>Available Until:</th>
        <td>
          <NA v-if="!serviceInfo.last_date?.formatDate() && isFetched" />
        </td>
      </tr>
      <tr>
        <th>Category:</th>
        <td><NA v-if="!serviceInfo.cate_name && isFetched" /></td>
      </tr>
    </tbody>
  </table>

  <button v-if="!isEditing" class="blueBtn" @click="openEditForm">
    <FontAwesomeIcon :icon="plusIcon" /> Edit Service Details
  </button>
  <div v-else id="duo">
    <button class="redBtn" @click="closeEditFrom">
      <FontAwesomeIcon :icon="cancelIcon" /> Cancel
    </button>
    <button class="greenBtn" @click="closeEditFrom">
      <FontAwesomeIcon :icon="saveIcon" /> Save Changes
    </button>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faCancel } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons

import unixToReadable from "@/lib/unixToReadable";
import NA from "@/components/NotAvailable.vue";

export default {
  props: {
    serviceInfo: Object,
    isFetched: Boolean,
  },
  components: {
    NA,
    FontAwesomeIcon,
  },
  data() {
    return {
      editIcon: faPenToSquare,
      isEditing: false,
      cancelIcon: faCancel,
      saveIcon: faCheck,
    };
  },
  methods: {
    formatDate(unixTime) {
      return unixToReadable(unixTime);
    },
    openEditForm() {
      this.isEditing = true;
    },
    closeEditFrom() {
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
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