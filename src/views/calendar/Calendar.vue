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
// lib
import { ref, onMounted } from "vue";
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
      // Use the router object for navigation
      router.push(`/calendar/${value}`);
      unixDate.value = value;
    };

    const onCompact = () => {
      isCompacting.value = !isCompacting.value;
    };

    onMounted(() => {
      // fetch unix date from URL on mount using the route object
      unixDate.value = Number(route.params.unixDate);
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
