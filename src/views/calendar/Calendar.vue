<template>
  <div id="layout">
    <DayInput
      :unixDate="unixDate"
      :onInputDate="onInputDate"
      :onMoveLeft="onMoveLeft"
      :onMoveRight="onMoveRight"
      :onMoveEnd="onMoveEnd"
    />

    <div id="relative">
      <div id="scroll">
        <ScrollContent :unixDate="unixDate" />
      </div>
    </div>
    <button @click="onCompact">Compact</button>
  </div>
</template>

<script>
// comps
import DayInput from "./comps/DayInput.vue";
import ScrollContent from "./comps/ScrollContent.vue";

export default {
  name: "Calendar-",
  components: {
    DayInput,
    ScrollContent,
  },
  data() {
    return {
      // status
      isCompacting: false,
      // resources
      unixDate: null,
    };
  },
  methods: {
    onMoveRight() {
      const scrollElement = document.getElementById("scroll");
      if (scrollElement) {
        scrollElement.scrollLeft += 140;
      }
    },
    onMoveLeft() {
      const scrollElement = document.getElementById("scroll");
      if (scrollElement) {
        scrollElement.scrollLeft -= 140;
      }
    },
    onMoveEnd(onward) {
      const scrollElement = document.getElementById("scroll");
      if (onward) {
        scrollElement.scrollLeft = scrollElement.scrollWidth;
      } else {
        scrollElement.scrollLeft = 0;
      }
    },
    async onInputDate(value) {
      this.$router.push(`/calendar/${value}`);
      this.unixDate = value;
    },
    onCompact() {
      this.isCompacting = !this.isCompacting;
    },
  },
  async created() {
    // fetch unix date from URL
    this.unixDate = Number(this.$route.params.unixDate);
  },
};
</script>

<style scoped>
#scroll {
  font-size: 14px;
  border: 3px outset;
  overflow-x: auto;
  height: 100%;
  background: white;
  color: black;
}

#layout {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100vw;
  margin-inline: auto;
  flex-grow: 1;
  box-sizing: border-box;
}

#relative {
  position: relative;
  z-index: 0;
}
</style>