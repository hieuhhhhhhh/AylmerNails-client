<template>
  <div>
    <table border="1">
      <thead>
        <tr>
          <td colspan="2">
            <div id="title">
              <span id="date"
                >{{ formatDate(serviceLength.effective_from) }} ~</span
              >
              <button class="blueBtn" id="edit">
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
          <!-- Correct use of parseSeconds -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import unixToReadable from "@/lib/unixToReadable";
export default {
  props: {
    serviceLength: Object,
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      rows: [],
      editIcon: faPenToSquare,
    };
  },
  methods: {
    formatDate(unixTime) {
      return unixToReadable(unixTime);
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
  /* color: gray; */
}
#edit {
  cursor: pointer;
  font-size: 12px;
  padding: 5px;
}
</style>
