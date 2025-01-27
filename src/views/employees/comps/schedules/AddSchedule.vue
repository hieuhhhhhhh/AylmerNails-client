<template>
  <button v-if="!isAdding" class="blueBtn" @click="openInput">
    <FontAwesomeIcon :icon="plusIcon" /> Add New Schedule
  </button>

  <div v-else>
    <div id="note">*Press on the right clock icon to select time</div>

    <div id="scroll">
      <table>
        <thead>
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
      <button class="greenBtn" type="submit">
        <FontAwesomeIcon :icon="saveIcon" /> Add
      </button>
    </div>
  </div>
</template>


<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// comps
import HoursInputs from "./HoursInputs.vue";
import DayCheckers from "./DayCheckers.vue";
export default {
  props: {
    serviceId: String,
  },
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
      // states
      closings: ["14:00", "14:00", "14:00", "14:00", "14:00", "14:00", null],
      openings: ["14:00", "14:00", "14:00", "14:00", "14:00", "14:00", null],
      // resources
      checked: [true, true, true, true, true, true, false],
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
#note {
  font-style: italic;
  color: rgb(184, 121, 3);
}
#duo {
  display: flex;
  gap: 15px;
}
</style>
