<template>
  <div>
    <table border="1">
      <thead>
        <tr>
          <td colspan="2" id="title">
            {{ formatDate(serviceLength.effective_from) }} ~
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
import unixToReadable from "@/lib/unixToReadable";
export default {
  props: {
    serviceLength: Object,
  },
  data() {
    return {
      rows: [],
    };
  },
  methods: {
    formatDate(unixTime) {
      return unixToReadable(unixTime);
    },
  },
  created() {
    const defaultLength = this.serviceLength.length;
    this.serviceLength.variations.forEach((e) => {
      this.rows.push({
        name: e.employee_alias,
        length: defaultLength + e.length_offset,
      });
    });

    const defaultName =
      this.serviceLength.variations.length > 0 ? "Others" : "All";
    this.rows.push({ name: defaultName, length: this.serviceLength.length });
  },
};
</script>

<style>
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
  font-size: 14px;
  text-align: right;
}
</style>
