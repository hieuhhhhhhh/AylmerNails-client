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
          <div class="duo" v-if="details.serviceName">
            <div>{{ details.serviceName }} - {{ details.cateName }}</div>
            <button class="infoBtn" @click="toService">i</button>
          </div>
          <div id="AOS" v-for="(AOS, index) in details.AOSOsText" :key="index">
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
              {{ formatPhone(details.phoneNum) }}
              <div>
                {{ details.contactName }}
              </div>
            </div>
            <div>
              <button class="infoBtn" v-if="details.userId" @click="toUser">
                i
              </button>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <th>Date Time</th>
        <td>{{ getTime }}<br />{{ getDate }} {{ getReminder }}</td>
      </tr>
      <tr>
        <th>Duration</th>
        <td>{{ getDuration + " mins" }} <br />(to {{ getEndTime }})</td>
      </tr>
      <tr>
        <th>Employee</th>
        <td>
          <div class="duo">
            {{ details.empAlias }}
            <button class="infoBtn" v-if="details.empId" @click="toEmployee">
              i
            </button>
          </div>
          <div class="selected" v-if="details.selectedEmps?.length">
            (client selected:
            {{ details.selectedEmps?.map((emp) => emp.empAlias).join(", ") }})
          </div>
        </td>
      </tr>

      <tr>
        <th>Booker</th>
        <td></td>
      </tr>

      <tr v-if="details.message">
        <th>Message</th>
        <td>
          <div id="message">
            {{ details.message }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <textarea
    id="note"
    ref="noteRef"
    type="text"
    rows="3"
    v-model="note"
    @change="onInputNote"
    placeholder="Note (not visible to client)"
  />
</template>

<script>
// lib
import unixToReadable from "@/lib/unixToReadable";
import secsToHours from "@/lib/secsToHours";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import formatPhone from "@/lib/formatPhone";
import { useRouter } from "vue-router";
import { computed, nextTick, ref, watch } from "vue";

// apis
import writeAppoNote from "../../apis/writeAppoNote";

export default {
  props: {
    details: Object,
  },
  // components: {
  //   FontAwesomeIcon,
  // },
  setup(props) {
    // lib
    const router = useRouter();
    // payload
    const note = ref("");
    const noteRef = ref(null);

    // helpers
    const formatOffset = (seconds) => {
      if (seconds === 0) return;

      let sign = seconds >= 0 ? "+" : "-";
      let absMinutes = Math.abs(Math.floor(seconds / 60));

      return `(${sign}${absMinutes} mins)`;
    };

    const getTime = computed(() => {
      return secsToHours(props.details.start);
    });

    const getDate = computed(() => {
      const unixDate = props.details.date + 12 * 60 * 60;
      return unixToReadable(unixDate);
    });

    const getReminder = computed(() => {
      const unixDate = props.details.date + 12 * 60 * 60;
      const text = unixTimeToReminder(unixDate);
      if (text) {
        return `(${text})`;
      }
      return "";
    });

    const getDuration = computed(() => {
      const gap = props.details.end - props.details.start;
      return gap / 60;
    });

    const getEndTime = computed(() => {
      const seconds = props.details.end;
      return secsToHours(seconds);
    });

    // INPUT
    const toService = () => {
      router.push(`/services/details/${props.details.serviceId}`);
    };

    const toEmployee = () => {
      router.push(`/employees/details/${props.details.empId}`);
    };

    const toUser = () => {
      router.push(`/users/${props.details.userId}`);
    };

    const onInputNote = () => {
      writeAppoNote(props.details.id, note.value);
    };

    const autoResize = () => {
      if (noteRef.value) {
        noteRef.value.style.height = "auto";
        noteRef.value.style.height = `${noteRef.value.scrollHeight + 2}px`; // Set to scrollHeight
      }
    };

    // DEPENDENCIES
    watch(
      () => props.details.note,
      (newVal) => {
        note.value = newVal;
        nextTick(() => {
          autoResize();
        });
      }
    );

    watch(note, () => {
      autoResize();
    });

    return {
      // faInfo,
      note,
      noteRef,
      formatOffset,
      formatPhone,
      getTime,
      getDate,
      getDuration,
      getEndTime,
      getReminder,
      toService,
      toEmployee,
      toUser,
      onInputNote,
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

  padding: 3px 10px;
  text-align: left;
}
#AOS {
  font-size: 12px;
}
.duo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.infoBtn {
  aspect-ratio: 1;
  border-radius: 3px;
  font-family: Georgia, serif;
  width: 23px;
  padding: 0px;
  font-weight: bold;
}
.selected {
  font-size: 11px;
}
#message {
  /* font-size: 12px; */
  white-space: pre-wrap;
  max-height: 80px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.3);
  padding: 5px 10px;
  margin: -3px -10px;
}
textarea {
  width: 100%;
  box-sizing: border-box;
}
#note {
  margin-top: 10px;
  /* text-align: center; */
}
</style>
