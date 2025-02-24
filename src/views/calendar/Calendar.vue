<template>
  <div id="layout" v-if="unixDate">
    <DayInput
      :unixDate="unixDate"
      :onInputDate="onInputDate"
      :onMoveLeft="onMoveLeft"
      :onMoveRight="onMoveRight"
      :onMoveEnd="onMoveEnd"
    />

    <div id="relative">
      <div id="scroll">
        <ScrollContent
          :unixDate="unixDate"
          :isCompacting="isCompacting"
          :width="scrollWidth"
        />
      </div>
    </div>
    <button @click="onCompact">Compact</button>
  </div>
</template>

<script>
// comps
import DayInput from "./comps/DayInput.vue";
import ScrollContent from "./comps/ScrollContent.vue";
// lib
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Calendar-",
  components: {
    DayInput,
    ScrollContent,
  },
  setup() {
    // status
    const isCompacting = ref(false);
    // resources
    const unixDate = ref(null);
    const scrollWidth = ref(null);
    // lib
    const router = useRouter();
    const route = useRoute();

    const onMoveRight = () => {
      const scrollElement = document.getElementById("scroll");
      if (scrollElement) {
        scrollElement.scrollLeft += 140;
      }
    };

    const onMoveLeft = () => {
      const scrollElement = document.getElementById("scroll");
      if (scrollElement) {
        scrollElement.scrollLeft -= 140;
      }
    };

    const onMoveEnd = (onward) => {
      const scrollElement = document.getElementById("scroll");
      if (onward) {
        scrollElement.scrollLeft = scrollElement.scrollWidth;
      } else {
        scrollElement.scrollLeft = 0;
      }
    };

    const onInputDate = async (value) => {
      router.push(`/calendar/${value}`);
      unixDate.value = value;
    };

    const onCompact = () => {
      isCompacting.value = !isCompacting.value;
    };

    // Function to update scroll width dynamically
    const updateScrollWidth = () => {
      const scrollElement = document.getElementById("scroll");
      if (scrollElement) {
        scrollWidth.value = scrollElement.offsetWidth; // Get current width of #scroll
      }
    };

    // Set the initial value of scrollWidth on mount
    onMounted(() => {
      unixDate.value = Number(route.params.unixDate);
      updateScrollWidth(); // Initial value on mount

      // Add resize event listener
      window.addEventListener("resize", updateScrollWidth);
    });

    // Clean up the resize event listener when component is unmounted
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateScrollWidth);
    });

    // Return all reactive variables and methods
    return {
      unixDate,
      isCompacting,
      onMoveRight,
      onMoveLeft,
      onMoveEnd,
      onInputDate,
      onCompact,
      scrollWidth, // Expose scrollWidth to template
    };
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
