<template>
  <button v-if="!isAdding" class="blueBtn" @click="openInput">
    <FontAwesomeIcon :icon="plusIcon" /> Add New Schedule
  </button>

  <form v-else @submit.prevent="onSubmit">
    <div id="scroll">
      <table>
        <thead>
          <tr>
            <td colspan="7">
              <div id="title">
                Effective Date:
                <input type="date" id="datePicker" v-model="date" required />
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
        <tbody>
          <tr>
            <td>Open</td>
            <HoursInputs :times="openings" :setTime="setOpeningTime" />
          </tr>
          <tr>
            <td>Close</td>
            <HoursInputs :times="closings" :setTime="setClosingTime" />
          </tr>
          <tr>
            <td></td>
            <DayCheckers :checked="checked" :updateCheck="updateCheck" />
          </tr>
        </tbody>
      </table>
    </div>

    <br />
    <div id="duo">
      <button class="redBtn" @click.prevent="closeInput">
        <FontAwesomeIcon :icon="cancelIcon" /> Cancel
      </button>
      <button class="greenBtn">
        <FontAwesomeIcon :icon="saveIcon" /> Add Schedule
      </button>
    </div>
  </form>
</template>


<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// comps
import HoursInputs from "./HoursInputs.vue";
import DayCheckers from "./DayCheckers.vue";
// lib
import parseDate from "@/lib/parseDate";
import addSchedule from "../../apis/addSchedule";

export default {
  components: {
    FontAwesomeIcon,
    HoursInputs,
    DayCheckers,
  },

  data() {
    return {
      // icons
      plusIcon: faPlus,
      cancelIcon: faCancel,
      saveIcon: faCheck,
      // status
      isAdding: false,
      // products
      date: null,
      closings: ["14:00", "14:00", "14:00", "14:00", "14:00", "14:00", null],
      openings: ["14:00", "14:00", "14:00", "14:00", "14:00", "14:00", null],
      // resources
      checked: [true, true, true, true, true, true, false],
      empId: this.$route.params.id,
    };
  },
  methods: {
    openInput() {
      this.isAdding = true;
    },
    closeInput() {
      this.isAdding = false;
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
    async onSubmit() {
      const res = await addSchedule(
        this.empId,
        parseDate(this.date),
        this.openings,
        this.closings
      );

      if (res) {
        this.$router.push("/employees/refresh");
      }
    },
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
#scroll {
  width: fit-content;
  max-width: 100%;
  overflow-x: scroll;
}
#duo {
  display: flex;
  gap: 15px;
}
#datePicker {
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
}
</style>
