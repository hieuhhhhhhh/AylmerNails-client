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
          <div class="duo">
            <div>
              <div v-if="serviceName">{{ serviceName }} - {{ category }}</div>
            </div>
            <div>
              <button v-if="serviceName" @click.prevent="onClearService">
                X
              </button>
              <button @click.prevent="onOpenServicePicker">Select</button>
            </div>
          </div>
          <div id="AOS" v-for="(AOS, index) in AOSOs" :key="index">
            {{ AOS.question }} ~ {{ AOS.answer }}
            {{ formatOffset(AOS.offset) }}
          </div>
        </td>
      </tr>
      <tr>
        <th>Client</th>
        <td>
          <div class="duo">
            <div>
              {{ formatPhone(phoneNum) }}
              <div>
                {{ contactName }}
              </div>
            </div>
            <div>
              <button v-if="phoneNum" @click.prevent="onClearContact">X</button>
              <button @click.prevent="onSelectContact">Select</button>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th>Date</th>
        <td>
          <div class="center">
            <div>
              <button @click.prevent="onIncreaseDate(false)">-</button>

              <input
                type="date"
                :value="parseUT(date)"
                @change="onInputDate"
                required
              />
              <button @click.prevent="onIncreaseDate(true)">+</button>
            </div>
            {{ getReminder() }}
          </div>
        </td>
      </tr>

      <tr>
        <th>Time</th>
        <td>
          <div class="center">
            <div>
              <button @click.prevent="onIncreaseTime(false)">-</button>

              <input
                type="time"
                :value="parseUnixHours(start)"
                @change="onInputStart"
                required
              />
              <button @click.prevent="onIncreaseTime(true)">+</button>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th>Duration (mins)</th>
        <td>
          <div class="center">
            <div>
              <button @click.prevent="onIncreaseDuration(false)">-</button>

              <input
                type="number"
                :value="duration / 60"
                @input="onInputDuration"
                @focus="
                  (event) => {
                    event.target.select();
                  }
                "
                required
                :min="5"
                step="1"
              />
              <button @click.prevent="onIncreaseDuration(true)">+</button>
            </div>
            to {{ secsToHours(start + duration) }}
          </div>
        </td>
      </tr>

      <tr>
        <th>Employee</th>
        <td>
          <div class="duo">
            {{ empAlias }}
            <div>
              <button @click.prevent="onOpenEmpPicker">Select</button>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <th>Preferred</th>
        <td>
          {{ selectedEmps?.map((emp) => emp.empAlias).join(", ") }}
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
import parseDate from "@/lib/parseDate";
import parseUT from "@/lib/parseUT";
import parseTime from "@/lib/parseTime";
import parseUnixHours from "@/lib/parseUnixHours";
import secsToHours from "@/lib/secsToHours";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import formatPhone from "@/lib/formatPhone";

export default {
  props: {
    contactName: String,
    phoneNum: String,
    serviceName: String,
    category: String,
    AOSOs: Array,
    empAlias: String,
    selectedEmps: Array,
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
    onClearService: Function,
    onClearContact: Function,
  },
  setup(props) {
    // INPUT
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

    const onIncreaseTime = (boolean) => {
      const change = boolean ? 15 * 60 : -15 * 60;
      props.setStart(props.start + change);
    };

    const onIncreaseDuration = (boolean) => {
      const change = boolean ? 15 * 60 : -15 * 60;

      props.setDuration(props.duration + change);
    };

    const onIncreaseDate = (boolean) => {
      const change = boolean ? 24 * 60 * 60 : -24 * 60 * 60;
      props.setDate(props.date + change);
    };

    // FORMAT
    const formatOffset = (seconds) => {
      if (seconds === 0) return;

      let sign = seconds >= 0 ? "+" : "-";
      let mins = Math.abs(Math.floor(seconds / 60));

      return `(${sign}${mins} mins)`;
    };
    const getReminder = () => {
      const unixDate = props.date + 12 * 60 * 60;
      const text = unixTimeToReminder(unixDate);
      if (text) {
        return `${text}`;
      }
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
      onInputDate,
      onInputStart,
      onInputDuration,
      onInputNote,
      parseUT,
      parseUnixHours,
      secsToHours,
      getReminder,
      onIncreaseDuration,
      onIncreaseTime,
      onIncreaseDate,
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
  border-radius: 3px;
  height: 23px;
  aspect-ratio: 1;
  margin-inline: 2px;
  user-select: none;
}
.duo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.center {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
</style>
