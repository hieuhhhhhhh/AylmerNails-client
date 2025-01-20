<template>
  <div>
    <table border="1">
      <thead>
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
export default {
  props: {
    serviceLength: Object,
  },
  data() {
    return {
      rows: [{ name: "Default", length: this.serviceLength.length }],
    };
  },
  created() {
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
</style>
