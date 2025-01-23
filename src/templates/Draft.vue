<template>
  <div>
    <table>
      <colgroup>
        <col style="width: auto" />
        <col style="width: 90%" />
      </colgroup>
      <tbody>
        <tr>
          <td>Row 1, Col 1</td>
          <td>Row 1, Col 2</td>
        </tr>
        <tr>
          <td>Row 2, Col 1</td>
          <td>
            <textarea
              id="description"
              type="text"
              rows="3"
              :value="description"
              @input="setDescription"
              required
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SimpleTable",
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
  background-color: aqua;
}

td {
  padding: 8px;
}
</style>
