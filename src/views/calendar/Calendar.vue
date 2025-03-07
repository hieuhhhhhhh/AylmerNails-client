<template>
  <div id="layout" v-if="unixDate">
    <div v-show="!isHidingMain" :key="resetMain">
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
      <button v-if="!isAdding && !editId" @click="onOpenAdding">
        Add Appo
      </button>
    </div>

    <EditAppo
      id="edit-appo"
      v-if="editId"
      :appoId="editId"
      :onCancelEdit="onCancelEdit"
      :onHideMain="onHideMain"
      :onDoneEdit="onDoneEdit"
    />
    <AddAppo
      v-if="isAdding"
      :unixDate="unixDate"
      :onCancelAdding="onCancelAdding"
      :onHideMain="onHideMain"
      :onDoneEdit="onDoneEdit"
    />
  </div>
</template>

<script>
// comps
import DayInput from "./comps/DayInput.vue";
import ScrollContent from "./comps/ScrollContent.vue";
import AppoDetails from "./comps/appo/Parent.vue";
import EditAppo from "./comps/edit_appo/Parent.vue";
import AddAppo from "./comps/add_appo/Parent.vue";
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
    AddAppo,
  },
  setup() {
    // status
    const isCompacting = ref(true);
    const isHidingMain = ref(false);
    const isAdding = ref(false);
    // resources
    const resetMain = ref(0);
    const unixDate = ref(null);
    const scrollWidth = ref(null);
    const appoId = ref(null);
    const editId = ref(null);
    const lastScroll = ref(0);
    // lib
    const router = useRouter();
    const route = useRoute();

    // INPUT HANDLERS
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

    const onHideMain = (value) => {
      if (value) {
        // store current scroll y before hide main
        lastScroll.value = window.scrollY;
        console.log("lastScroll.value", lastScroll.value);
      }

      isHidingMain.value = value;
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
      isAdding.value = false;
    };

    const onCancelEdit = () => {
      isHidingMain.value = false;
      editId.value = null;
    };

    const onDoneEdit = (newDate, newAppoId) => {
      resetMain.value++; // reset component by increment its key
      editId.value = null;
      isAdding.value = false;
      router.push(`/calendar/${newDate}/${newAppoId}`);
    };

    const onOpenAdding = () => {
      editId.value = null;
      isAdding.value = true;
    };

    const onCancelAdding = () => {
      isAdding.value = false;
    };
    // DEPENDENT
    watch(editId, async (newVal) => {
      if (newVal) {
        await nextTick();
        const target = document.querySelector("#edit-appo");
        if (target) {
          // Scroll the window to the EditAppo component
          target.scrollIntoView({
            block: "end",
          });
        }
      }
    });

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
      }
    );

    // STYLES
    const updateScrollWidth = () => {
      const scrollElement = document.getElementById("scroll");
      if (scrollElement) {
        scrollWidth.value = scrollElement.offsetWidth; // Get current width of #scroll
      }
    };

    // LIFECYCLE
    onMounted(async () => {
      // read params from URL
      unixDate.value = Number(route.params.unixDate);
      appoId.value = Number(route.params.appoId);

      await nextTick(); // Wait for the DOM to update
      updateScrollWidth(); // Ensure the correct width is captured

      // Add resize event listener
      window.addEventListener("resize", updateScrollWidth);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", updateScrollWidth);
    });

    return {
      resetMain,
      unixDate,
      scrollWidth,
      appoId,
      editId,
      isCompacting,
      isHidingMain,
      isAdding,
      onMoveRight,
      onMoveLeft,
      onInputDate,
      onCompact,
      onSelectAppo,
      onCloseAppo,
      onEditAppo,
      onCancelEdit,
      onDoneEdit,
      onHideMain,
      onOpenAdding,
      onCancelAdding,
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

  background-color: rgb(193, 193, 193);
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
