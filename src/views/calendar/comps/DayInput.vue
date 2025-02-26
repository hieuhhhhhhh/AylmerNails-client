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
import { ref, watch } from "vue";

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
  setup(props) {
    // Define reactive variables
    const date = ref(null);

    // Watch for changes in props.unixDate
    watch(
      () => props.unixDate,
      (newVal) => {
        date.value = parseUT(newVal); // Ensure it's properly parsed
      }
    );

    // Methods
    const onSelect = (event) => {
      date.value = event.target.value;
      props.onInputDate(parseDate(date.value));
    };

    const moveDay = (direction) => {
      const [year, month, day] = date.value.split("-").map(Number);
      const currentDate = new Date(Date.UTC(year, month - 1, day)); // Ensure UTC time
      currentDate.setUTCDate(currentDate.getUTCDate() + direction);
      date.value = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD format
      props.onInputDate(parseDate(date.value));
    };

    const moveLeft = () => {
      props.onMoveLeft();
    };

    const moveRight = () => {
      props.onMoveRight();
    };

    const moveEnd = () => {
      props.onCompact();
    };

    // Initialize date when the component is created
    date.value = parseUT(props.unixDate);

    return {
      date,
      onSelect,
      moveDay,
      moveLeft,
      moveRight,
      moveEnd,
      backIcon: faAngleDoubleLeft,
      nextIcon: faAngleDoubleRight,
      leftIcon: faAngleLeft,
      rightIcon: faAngleRight,
      expandIcon: faExpand,
    };
  },
};
</script>

<style scoped>
#flexBox {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
#main {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 5px;
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
