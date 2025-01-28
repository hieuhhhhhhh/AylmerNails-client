<template>
  <form @submit.prevent="onSubmit">
    <div id="scroll">
      <table>
        <thead>
          <tr>
            <td colspan="4">
              <span id="date">From {{ formattedDate() }} ~</span>
            </td>
            <td colspan="4">
              <div id="edit">
                <button
                  v-if="!isEditing"
                  class="blueBtn"
                  id="smallBtn"
                  @click.prevent="openEdit"
                >
                  <FontAwesomeIcon :icon="editIcon" /> Edit
                </button>

                <div v-else>
                  <button
                    class="redBtn"
                    id="smallBtn"
                    @click.prevent="closeEdit"
                  >
                    <FontAwesomeIcon :icon="cancelIcon" /> Cancel
                  </button>
                  <button class="greenBtn" id="smallBtn">
                    <FontAwesomeIcon :icon="saveIcon" /> Save
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th></th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sar</th>
            <th>Sun</th>
          </tr>
        </thead>
        <tbody :key="resetKey">
          <tr>
            <td>Open</td>
            <HoursInputs
              :times="openings"
              :setTime="setOpeningTime"
              :disabled="!isEditing"
            />
          </tr>
          <tr>
            <td>Close</td>
            <HoursInputs
              :times="closings"
              :setTime="setClosingTime"
              :disabled="!isEditing"
            />
          </tr>
          <tr>
            <td></td>
            <DayCheckers
              :checked="checked"
              :updateCheck="updateCheck"
              :disabled="!isEditing"
            />
          </tr>
        </tbody>
      </table>
    </div>
  </form>
  <br />
  <br />
  <br />
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// comps
import HoursInputs from "./HoursInputs.vue";
import DayCheckers from "./DayCheckers.vue";
// lib
import unixToReadable from "@/lib/unixToReadable";
import addSchedule from "../../apis/addSchedule";

export default {
  name: "Schedule-",
  props: {
    schedule: Object,
  },
  components: {
    FontAwesomeIcon,
    HoursInputs,
    DayCheckers,
  },
  data() {
    return {
      // icons
      editIcon: faPenToSquare,
      cancelIcon: faCancel,
      saveIcon: faCheck,
      // status
      isEditing: false,
      resetKey: 0,
      // states
      date: null,
      closings: [],
      openings: [],
      // resources
      checked: [],
      empId: this.$route.params.id,
    };
  },
  methods: {
    openEdit() {
      this.isEditing = true;
    },
    closeEdit() {
      this.fetchStates();
      this.resetKey += 1;
      this.isEditing = false;
    },
    formattedDate() {
      return unixToReadable(this.date);
    },
    setOpeningTime(index, value) {
      this.openings[index] = value;
    },
    setClosingTime(index, value) {
      this.closings[index] = value;
    },
    updateCheck(index, value) {
      this.checked[index] = value;
      if (value) {
        this.openings[index] = "14:00";
        this.closings[index] = "14:00";
      } else {
        this.openings[index] = null;
        this.closings[index] = null;
      }
    },
    fetchStates() {
      this.date = this.schedule.date;
      // deep copy arrays
      this.closings = [...this.schedule.closings];
      this.openings = [...this.schedule.openings];
      this.checked = [...this.schedule.checked];
    },
    async onSubmit() {
      const res = await addSchedule(
        this.empId,
        this.date,
        this.openings,
        this.closings
      );

      if (res) {
        this.$router.push("/employees/refresh");
      }
    },
  },
  created() {
    this.fetchStates();
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: var(--background-i2);
}
#edit {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
#smallBtn {
  margin: 5px;
  padding: 5px;
}
#scroll {
  width: fit-content;
  max-width: 100%;
  overflow-x: scroll;
}

#date {
  color: rgb(160, 130, 40);
}
</style>
