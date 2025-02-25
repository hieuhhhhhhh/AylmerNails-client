<template>
  <div id="layout" v-if="unixDate">
    <DayInput
      :unixDate="unixDate"
      :onInputDate="onInputDate"
      :onMoveLeft="onMoveLeft"
      :onMoveRight="onMoveRight"
      :isCompacting="isCompacting"
      :onCompact="onCompact"
    />

    <div id="relative">
      <div id="scroll">
        <ScrollContent
          :unixDate="unixDate"
          :isCompacting="isCompacting"
          :width="scrollWidth"
          :onSelectAppo="onSelectAppo"
        />
      </div>
    </div>

    <AppoDetails v-if="appoId" :appoId="appoId" :onCloseAppo="onCloseAppo" />
  </div>
</template>

<script>
// comps
import DayInput from "./comps/DayInput.vue";
import ScrollContent from "./comps/ScrollContent.vue";
import AppoDetails from "./comps/AppoDetails.vue";
// lib
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Calendar-",
  components: {
    DayInput,
    ScrollContent,
    AppoDetails,
  },
  setup() {
    // status
    const isCompacting = ref(true);
    // resources
    const unixDate = ref(null);
    const scrollWidth = ref(null);
    // outcomes
    const appoId = ref(null);
    // lib
    const router = useRouter();
    const route = useRoute();

    // helpers
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

    const onInputDate = async (value) => {
      router.push(`/calendar/${value}`);
      unixDate.value = value;
    };

    const onCompact = () => {
      isCompacting.value = !isCompacting.value;
    };

    const onSelectAppo = (id) => {
      console.log("appoId", id);

      appoId.value = id;
    };

    const onCloseAppo = () => {
      appoId.value = null;
    };

    // Function to update scroll width dynamically
    const updateScrollWidth = () => {
      const scrollElement = document.getElementById("scroll");
      if (scrollElement) {
        scrollWidth.value = scrollElement.offsetWidth; // Get current width of #scroll
      }
    };

    // Set the initial value of scrollWidth on mount
    onMounted(async () => {
      unixDate.value = Number(route.params.unixDate);

      await nextTick(); // Wait for the DOM to update
      updateScrollWidth(); // Ensure the correct width is captured

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
      scrollWidth,
      appoId,
      isCompacting,
      onMoveRight,
      onMoveLeft,
      onInputDate,
      onCompact,
      onSelectAppo,
      onCloseAppo,
    };
  },
};
</script>

<style scoped>
#scroll {
  font-size: 14px;
  border: 3px outset;
  overflow-x: auto;
  overflow-y: hidden;

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
