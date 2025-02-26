<template>
  <table>
    <colgroup>
      <col style="width: auto" />
      <col style="width: 80%" />
    </colgroup>
    <tbody>
      <tr>
        <th>Service</th>
        <td>
          {{ serviceName }} ({{ category }})
          <br />
          <div id="AOS" v-for="(AOS, index) in AOSOs" :key="index">
            {{ AOS.question }} ~ {{ AOS.answer }}
            {{ formatOffset(AOS.offset) }}
          </div>
        </td>
      </tr>
      <tr>
        <th>Employee</th>
        <td>{{ empAlias }}</td>
      </tr>
      <tr>
        <th>Date Time</th>
        <td></td>
      </tr>
      <tr>
        <th>Duration</th>
        <td></td>
      </tr>
      <tr>
        <th>Client</th>
        <td></td>
      </tr>

      <tr>
        <th>Note</th>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    serviceName: String,
    category: String,
    AOSOs: Object,
    empAlias: String,
    date: Number,
    start: Number,
    duration: Number,
    note: String,
  },
  setup() {
    // helpers
    const formatOffset = (seconds) => {
      if (seconds === 0) return;

      let sign = seconds >= 0 ? "+" : "-";
      let absMinutes = Math.abs(Math.floor(seconds / 60));

      return `(${sign}${absMinutes} mins)`;
    };

    return {
      formatOffset,
    };
  },
};
</script>

<style scoped>
#background {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}

table {
  text-align: left;
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
}
th,
td {
  border: 1px solid;
  padding: 5px;
  text-align: left;
}
#AOS {
  font-size: 12px;
}
</style>
