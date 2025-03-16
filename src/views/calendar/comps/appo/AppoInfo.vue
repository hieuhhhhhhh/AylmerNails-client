<template>
  <table>
    <colgroup>
      <col style="width: auto" />
      <col style="width: 80%" />
    </colgroup>
    <tbody>
      <tr>
        <th>Client</th>
        <td>
          {{ details.contactName }}
          <br />
          {{ formatPhone(details.phoneNum) }}
        </td>
      </tr>
      <tr>
        <th>Service</th>
        <td>
          {{ details.serviceName }} ({{ details.cateName }})
          <br />
          <div id="AOS" v-for="(AOS, index) in details.AOSOsText" :key="index">
            {{ AOS.question }} ~ {{ AOS.answer }}
            {{ formatOffset(AOS.offset) }}
          </div>
        </td>
      </tr>
      <tr>
        <th>Employee</th>
        <td>{{ details.empAlias }}</td>
      </tr>
      <tr>
        <th>Date Time</th>
        <td>{{ getTime() }}<br />{{ getDate() }} {{ getReminder() }}</td>
      </tr>
      <tr>
        <th>Duration</th>
        <td>{{ getDuration() + " mins" }} <br />(to {{ getEndTime() }})</td>
      </tr>
      <tr>
        <th>Note</th>
        <td>{{ details.note }}</td>
      </tr>
      <tr>
        <th>Booker</th>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// lib
import unixToReadable from "@/lib/unixToReadable";
import secsToHours from "@/lib/secsToHours";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import formatPhone from "@/lib/formatPhone";

export default {
  props: {
    details: Object,
  },
  setup(props) {
    // helpers
    const formatOffset = (seconds) => {
      if (seconds === 0) return;

      let sign = seconds >= 0 ? "+" : "-";
      let absMinutes = Math.abs(Math.floor(seconds / 60));

      return `(${sign}${absMinutes} mins)`;
    };

    const getTime = () => {
      const seconds = props.details.start;
      return secsToHours(seconds);
    };

    const getDate = () => {
      const unixDate = props.details.date + 12 * 60 * 60;
      return unixToReadable(unixDate);
    };

    const getReminder = () => {
      const unixDate = props.details.date + 12 * 60 * 60;
      const text = unixTimeToReminder(unixDate);
      if (text) {
        return `(${text})`;
      }
    };

    const getDuration = () => {
      const gap = props.details.end - props.details.start;
      return gap / 60;
    };

    const getEndTime = () => {
      const seconds = props.details.end;
      return secsToHours(seconds);
    };
    return {
      formatOffset,
      formatPhone,
      getTime,
      getDate,
      getDuration,
      getEndTime,
      getReminder,
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
  border: 1px solid black;

  padding: 5px;
  text-align: left;
}
#AOS {
  font-size: 12px;
}
</style>
