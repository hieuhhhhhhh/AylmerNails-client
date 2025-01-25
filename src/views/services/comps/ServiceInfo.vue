<template>
  <div id="ServiceInfo" v-if="!isEditing">
    <table>
      <tbody>
        <tr>
          <th>Name:</th>
          <td class="highlight">{{ serviceInfo.name }}</td>
        </tr>
        <tr>
          <th>Description:</th>
          <td>
            <div id="description">{{ serviceInfo.description }}</div>
            <NA v-if="!serviceInfo.description && isFetched" />
          </td>
        </tr>
        <tr>
          <th>Available Until:</th>
          <td>
            <div v-if="serviceInfo.last_date && isFetched">
              {{ formatDate(serviceInfo.last_date) }}
            </div>
            <NA v-else />
          </td>
        </tr>
        <tr>
          <th>Category:</th>
          <td>
            {{ serviceInfo.cate_name
            }}<NA v-if="!serviceInfo.cate_id && isFetched" />
          </td>
        </tr>
      </tbody>
    </table>

    <button class="blueBtn" @click="openEditForm">
      <FontAwesomeIcon :icon="editIcon" /> Edit Service Details
    </button>
  </div>
  <div v-else>
    <EditServiceInfo
      :serviceId="serviceId"
      :onClose="closeEditFrom"
      :iName="serviceInfo.name"
      :iDescription="serviceInfo.description"
      :iCategoryId="serviceInfo.cate_id"
      :iDate="serviceInfo.last_date"
    />
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faCancel } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons

import unixToReadable from "@/lib/unixToReadable";
import NA from "@/components/NotAvailable.vue";
import EditServiceInfo from "./EditServiceInfo.vue";

export default {
  props: {
    serviceInfo: Object,
    isFetched: Boolean,
    serviceId: String,
  },
  components: {
    NA,
    FontAwesomeIcon,
    EditServiceInfo,
  },
  data() {
    return {
      //icon
      editIcon: faPenToSquare,
      cancelIcon: faCancel,
      saveIcon: faCheck,

      // status
      isEditing: false,
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
#ServiceInfo {
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
#description {
  white-space: pre-wrap;
  font-size: 14px;
}
</style>