<template>
  <table>
    <tbody>
      <tr>
        <th>Service</th>
        <td>{{ appo.serviceName }} ({{ appo.category }})</td>
      </tr>
      <tr>
        <th>Date</th>
        <td>
          {{ unixToReadable(appo.date) }}
          <div>({{ unixTimeToReminder(appo.date) }})</div>
        </td>
      </tr>
      <tr>
        <th>Time</th>
        <td>{{ secsToHours(appo.start) }}</td>
      </tr>
      <tr>
        <th>Duration</th>
        <td>{{ (appo.end - appo.start) / 60 }} mins</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// lib
import unixToReadable from "@/lib/unixToReadable";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";

export default {
  props: {
    appo: Object,
  },
  setup() {
    return {
      unixTimeToReminder,
      unixToReadable,
      secsToHours,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  text-align: center;
  border: 1px solid;
}
</style>