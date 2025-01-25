<template>
  <div v-if="!isEditing">
    <table border="1">
      <thead>
        <tr>
          <td colspan="2">
            <div id="title">
              <span id="date"
                >{{ formatDate(serviceLength.effective_from) }} ~</span
              >
              <button class="blueBtn" id="edit" @click="openEditTable">
                <FontAwesomeIcon :icon="editIcon" /> Edit
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <th>Employee</th>
          <th>Service Length (minutes)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td>{{ row.name }}</td>
          <td>{{ row.length / 60 }}</td>
        </tr>
      </tbody>
    </table>
    <br />
  </div>
  <EditSL
    v-else
    :serviceId="serviceId"
    :effective_from="serviceLength.effective_from"
    :inputLength="serviceLength.length"
    :inputVariations="serviceLength.variations"
    :cancelEditing="closeEditTable"
  />
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import unixToReadable from "@/lib/unixToReadable";
import EditSL from "../EditSL.vue";
export default {
  props: {
    serviceLength: Object,
    serviceId: String,
  },
  components: {
    FontAwesomeIcon,
    EditSL,
  },
  data() {
    return {
      rows: [],
      editIcon: faPenToSquare,
      isEditing: false,
    };
  },
  methods: {
    formatDate(unixTime) {
      return unixToReadable(unixTime);
    },
    openEditTable() {
      this.isEditing = true;
    },
    closeEditTable() {
      this.isEditing = false;
    },
  },
  created() {
    this.rows.push({
      name: "ALL",
      length: this.serviceLength.length,
    });

    const defaultLength = this.serviceLength.length;
    this.serviceLength.variations.forEach((e) => {
      this.rows.push({
        name: e.employee_alias,
        length: defaultLength + e.length_offset,
      });
    });
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  max-width: 100vw;
}

th,
td {
  padding: 10px;
  text-align: left;
}

#title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#date {
  color: rgb(160, 130, 40);
  font-size: 14px;
}
#edit {
  cursor: pointer;
  font-size: 12px;
  padding: 5px;
}
</style>
