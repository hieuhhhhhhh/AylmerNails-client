<template>
  <table>
    <colgroup>
      <col style="width: auto" />
      <col style="width: 80%" />
    </colgroup>
    <tbody>
      <tr>
        <th>Name:</th>
      </tr>
      <tr>
        <th>Intervals:</th>
      </tr>
      <div v-if="AOSs.length" id="note">
        *Service's additional options are not editable
      </div>
      <tr>
        <th>Services:</th>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data() {
    return {
      // states
      name: "",
      intervals: [],
      last_date: null,
      ESs: [],
      schedules: [],
    };
  },
};
</script>

<style scoped>
#note {
  font-style: italic;
  color: rgb(184, 121, 3);
}
</style>