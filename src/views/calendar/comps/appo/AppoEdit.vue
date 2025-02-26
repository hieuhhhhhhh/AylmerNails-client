<template>
  <table>
    <colgroup>
      <col style="width: auto" />
      <col style="width: 80%" />
    </colgroup>
    <tbody>
      <tr>
        <th>Service</th>
        <td></td>
      </tr>
      <tr>
        <th>Employee</th>
        <td></td>
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
  setup() {},
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
  border: 1px solid black;

  padding: 5px;
  text-align: left;
}
</style>
