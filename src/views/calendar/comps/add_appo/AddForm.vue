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
          {{ formatPhone(phoneNum) }}
          <button @click.prevent="onSelectContact">Select</button>
          <br />
          {{ clientName }}
        </td>
      </tr>
      <tr>
        <th>Service</th>
        <td>
          {{ serviceName }} {{ getCate() }}
          <button @click.prevent="onOpenServicePicker">Select</button>
          <br />
          <div id="AOS" v-for="(AOS, index) in AOSOs" :key="index">
            {{ AOS.question }} ~ {{ AOS.answer }}
            {{ formatOffset(AOS.offset) }}
          </div>
        </td>
      </tr>
      <tr>
        <th>Employee</th>
        <td>
          {{ empAlias }}
          <button @click.prevent="onOpenEmpPicker">Select</button>
        </td>
      </tr>
      <tr>
        <th>Date Time</th>
        <td>
          <input
            type="time"
            :value="parseUnixHours(start)"
            @change="onInputStart"
            required
          /><br />
          <input type="date" :value="parseUT(date)" disabled />
          {{ getReminder() }}
        </td>
      </tr>
      <tr>
        <th>Duration (mins)</th>
        <td>
          <input
            type="number"
            :value="duration / 60"
            @input="onInputDuration"
            required
            :min="5"
            step="1"
          />
          {{ getEndTime() }}
        </td>
      </tr>

      <tr>
        <th>Note</th>
        <td>
          <textarea
            type="text"
            rows="3"
            placeholder="write a note... (not visible to client)"
            :value="note"
            ref="TAref"
            @input="onInputNote"
          />
        </td>
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
import { ref, onMounted, nextTick } from "vue";
import parseUT from "@/lib/parseUT";
import parseTime from "@/lib/parseTime";
import parseUnixHours from "@/lib/parseUnixHours";
import secsToHours from "@/lib/secsToHours";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import formatPhone from "@/lib/formatPhone";

export default {
  props: {
    clientName: String,
    phoneNum: String,
    serviceName: String,
    category: String,
    AOSOs: Array,
    empAlias: String,
    date: Number,
    start: Number,
    duration: Number,
    note: String,
    setDate: Function,
    setStart: Function,
    setDuration: Function,
    setNote: Function,
    onOpenEmpPicker: Function,
    onOpenServicePicker: Function,
    onSelectContact: Function,
  },
  setup(props) {
    // HANDLERS
    const onInputStart = (event) => {
      const value = parseTime(event.target.value);
      props.setStart(value);
    };

    const onInputDuration = (event) => {
      const value = event.target.value * 60;
      props.setDuration(value);
    };

    const onInputNote = (event) => {
      const value = event.target.value;
      props.setNote(value);
      expandNoteTA();
    };

    // FORMAT
    const formatOffset = (seconds) => {
      if (seconds === 0) return;

      let sign = seconds >= 0 ? "+" : "-";
      let mins = Math.abs(Math.floor(seconds / 60));

      return `(${sign}${mins} mins)`;
    };
    const getReminder = () => {
      if (!props.date) return;
      const unixDate = props.date + 12 * 60 * 60;
      const text = unixTimeToReminder(unixDate);
      if (text) {
        return `(${text})`;
      }
    };
    const getCate = () => {
      const cate = props.category;
      if (cate) return `(${cate})`;
    };
    const getEndTime = () => {
      if (!props.start || !props.duration) return;
      const end = props.start + props.duration;
      return `(to ${secsToHours(end)})`;
    };

    // STYLES
    const TAref = ref(null);
    const expandNoteTA = () => {
      nextTick(() => {
        const el = TAref.value;
        if (el) {
          el.style.height = "auto";
          el.style.height = el.scrollHeight + "px";
        }
      });
    };

    // LIFECYCLE
    onMounted(() => {
      expandNoteTA();
    });

    return {
      TAref,
      formatOffset,
      formatPhone,
      onInputStart,
      onInputDuration,
      onInputNote,
      parseUT,
      parseUnixHours,
      secsToHours,
      getReminder,
      getCate,
      getEndTime,
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
input[type="time"] {
  width: 100px;
  margin-bottom: 5px;
}
input[type="number"] {
  width: 100px;
}
textarea {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 10px;
  overflow-y: hidden;
}
button {
  border-radius: 0;
}
</style>
