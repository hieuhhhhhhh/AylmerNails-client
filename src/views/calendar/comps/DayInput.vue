<template>
  <div id="flexBox">
    <input type="date" id="datePicker" :value="date" @change="onSelect" />
  </div>
  <div id="main">
    <button @click="moveDay(-1)">
      <FontAwesomeIcon :icon="backIcon" />
    </button>
    <div>
      <button v-if="!isCompacting" @click="moveLeft">
        <FontAwesomeIcon :icon="leftIcon" />
      </button>
      <button @click="moveEnd">
        <FontAwesomeIcon :icon="expandIcon" />
      </button>
      <button v-if="!isCompacting" @click="moveRight">
        <FontAwesomeIcon :icon="rightIcon" />
      </button>
    </div>

    <button @click="moveDay(1)">
      <FontAwesomeIcon :icon="nextIcon" />
    </button>
  </div>
</template>

<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleRight,
  faAngleLeft,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";

// lib
import parseDate from "@/lib/parseDate";
import parseUT from "@/lib/parseUT";

export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    unixDate: Number,
    onInputDate: Function,
    onMoveLeft: Function,
    onMoveRight: Function,
    isCompacting: Boolean,
    onCompact: Function,
  },
  data() {
    return {
      // icons
      leftIcon: faAngleLeft,
      rightIcon: faAngleRight,
      backIcon: faAngleDoubleLeft,
      nextIcon: faAngleDoubleRight,
      expandIcon: faExpand,
      // outcome
      date: null,
    };
  },
  methods: {
    onSelect(event) {
      this.date = event.target.value;
      this.onInputDate(parseDate(this.date));
    },
    moveDay(direction) {
      const currentDate = new Date(this.date); // create a Date object from the selected date
      currentDate.setDate(currentDate.getDate() + direction); // modify the date by +/- 1 day
      this.date = currentDate.toISOString().split("T")[0]; // format back to 'YYYY-MM-DD'
      this.onInputDate(parseDate(this.date));
    },
    moveLeft() {
      this.onMoveLeft();
      this.onward = true;
    },
    moveRight() {
      this.onMoveRight();
      this.onward = false;
    },
    moveEnd() {
      this.onCompact();
    },
  },
  created() {
    this.date = parseUT(this.unixDate);
  },
};
</script>

<style scoped>
#flexBox {
  display: flex;
  justify-content: center;
}
#main {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
}
#datePicker {
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
}
button {
  font-size: 30px;
  height: fit-content;
}
</style>
