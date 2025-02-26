<template>
  <div id="layout" v-if="unixDate">
    <div v-show="!isHidingMain">
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

      <AppoDetails
        v-if="appoId"
        :appoId="appoId"
        :onCloseAppo="onCloseAppo"
        :onEditAppo="onEditAppo"
      />
    </div>
    <EditAppo
      v-if="editId"
      :appoId="editId"
      :onCancelEdit="onCancelEdit"
      :onToogleScreen="onToogleScreen"
    />
  </div>
</template>

<script>
// comps
import DayInput from "./comps/DayInput.vue";
import ScrollContent from "./comps/ScrollContent.vue";
import AppoDetails from "./comps/appo/Parent.vue";
import EditAppo from "./comps/edit_appo/Parent.vue";
// lib
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "Calendar-",
  components: {
    DayInput,
    ScrollContent,
    AppoDetails,
    EditAppo,
  },
  setup() {
    // status
    const isCompacting = ref(true);
    const isHidingMain = ref(false);
    // resources
    const unixDate = ref(null);
    const scrollWidth = ref(null);
    const appoId = ref(null);
    const editId = ref(null);
    const lastScroll = ref(0);

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

    const onToogleScreen = () => {
      const last = isHidingMain.value;
      isHidingMain.value = !last;

      if (!last) {
        lastScroll.value = window.scrollY;
        console.log("lastScroll.value", lastScroll.value);
      }
    };

    const onSelectAppo = (id) => {
      console.log("appoId", id);
      appoId.value = id;
    };

    const onCloseAppo = () => {
      appoId.value = null;
    };

    const onEditAppo = (id) => {
      appoId.value = null;
      editId.value = id;
    };

    const onCancelEdit = () => {
      isHidingMain.value = false;
      editId.value = null;
    };

    // event
    watch(isHidingMain, async (newValue) => {
      if (!newValue) {
        await nextTick();
        window.scrollTo(0, lastScroll.value);
        console.log("scrolling");
      }
    });

    watch(
      () => route.path,
      () => {
        // read params from URL
        unixDate.value = Number(route.params.unixDate);
        appoId.value = Number(route.params.appoId);
        onCancelEdit();
        onCloseAppo();
      }
    );

    // event handlers
    const updateScrollWidth = () => {
      const scrollElement = document.getElementById("scroll");
      if (scrollElement) {
        scrollWidth.value = scrollElement.offsetWidth; // Get current width of #scroll
      }
    };

    // life cycle
    onMounted(async () => {
      // read params from URL
      unixDate.value = Number(route.params.unixDate);
      appoId.value = Number(route.params.appoId);

      await nextTick(); // Wait for the DOM to update
      updateScrollWidth(); // Ensure the correct width is captured

      // Add resize event listener
      window.addEventListener("resize", updateScrollWidth);
    });

    // life cycle
    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateScrollWidth);
    });

    // Return all reactive variables and methods
    return {
      unixDate,
      scrollWidth,
      appoId,
      editId,
      isCompacting,
      isHidingMain,
      onMoveRight,
      onMoveLeft,
      onInputDate,
      onCompact,
      onSelectAppo,
      onCloseAppo,
      onEditAppo,
      onCancelEdit,
      onToogleScreen,
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
