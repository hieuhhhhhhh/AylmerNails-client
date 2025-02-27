<template>
  <table>
    <colgroup>
      <col style="width: auto" />
      <col style="width: 80%" />
    </colgroup>
    <tbody>
      <tr>
        <th>Client</th>
        <td></td>
      </tr>
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
        <td>
          <input
            type="time"
            :value="parseUnixHours(start)"
            @change="onInputStart"
            required
          />
          <input
            type="date"
            :value="parseUT(date)"
            @change="onInputDate"
            required
          />
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
          (to {{ secsToHours(start + duration) }})
        </td>
      </tr>

      <tr>
        <th>Booker</th>
        <td></td>
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
    </tbody>
  </table>
</template>
<script>
// lib
import { ref, onMounted, nextTick } from "vue";
import parseDate from "@/lib/parseDate";
import parseUT from "@/lib/parseUT";
import parseTime from "@/lib/parseTime";
import parseUnixHours from "@/lib/parseUnixHours";
import secsToHours from "@/lib/secsToHours";

export default {
  props: {
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
  },
  setup(props) {
    //  element ref
    const TAref = ref(null);

    // input
    const onInputStart = (event) => {
      const value = parseTime(event.target.value);
      props.setStart(value);
    };

    const onInputDate = (event) => {
      const value = parseDate(event.target.value);
      props.setDate(value);
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

    // helpers
    const formatOffset = (seconds) => {
      if (seconds === 0) return;

      let sign = seconds >= 0 ? "+" : "-";
      let mins = Math.abs(Math.floor(seconds / 60));

      return `(${sign}${mins} mins)`;
    };

    // handler
    const expandNoteTA = () => {
      nextTick(() => {
        const el = TAref.value;
        if (el) {
          el.style.height = "auto";
          el.style.height = el.scrollHeight + "px";
        }
      });
    };

    // lifecycle
    onMounted(() => {
      expandNoteTA();
    });

    return {
      TAref,
      formatOffset,
      onInputDate,
      onInputStart,
      onInputDuration,
      onInputNote,
      parseUT,
      parseUnixHours,
      secsToHours,
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
  margin-right: 10px;
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
</style>
