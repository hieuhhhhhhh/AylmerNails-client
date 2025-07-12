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
            :NAMvisible="editId == null || !isAdding"
            :onSelectNAM="onSelectNAM"
            :EZstates="EZstates"
          />
        </div>
      </div>

      <AppoDetails
        v-if="appoId"
        :appoId="appoId"
        :onCloseAppo="onCloseAppo"
        :onEditAppo="onEditAppo"
      />
      <div id="flexBox">
        <button v-if="!isAdding && !editId" @click="onOpenAdding">
          <FontAwesomeIcon :icon="faPlus" />
          New
        </button>
      </div>
    </div>

    <EditAppo
      id="edit-appo"
      v-if="editId"
      :appoId="editId"
      :onCancelEdit="onCancelEdit"
      :onHideMain="onHideMain"
      :onDoneEdit="onDoneEdit"
      :NAMvalue="NAMvalue"
      :setEZstates="setEZstates"
    />
    <AddAppo
      v-if="isAdding"
      :unixDate="unixDate"
      :onCancelAdding="onCancelAdding"
      :onHideMain="onHideMain"
      :onDoneEdit="onDoneEdit"
      :NAMvalue="NAMvalue"
      :setEZstates="setEZstates"
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
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "Calendar-",
  components: {
    FontAwesomeIcon,
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
    const NAMvalue = ref({});
    const EZstates = ref(null);

    // lib
    const router = useRouter();
    const route = useRoute();

    // SETTERS
    const resetEZstates = () => {
      EZstates.value = null;
    };
    const setEZstates = (date, empId, start, duration) => {
      EZstates.value = { date, empId, start, duration };
    };

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
      router.push(`/calendar/${unixDate.value}/${id}`);
      appoId.value = id;
    };

    const onSelectNAM = (start, empId, empAlias, color, date) => {
      if (!editId.value) {
        isAdding.value = true;
      }
      nextTick(() => {
        NAMvalue.value = { start, empId, empAlias, color, date };
      });
    };

    const onCloseAppo = () => {
      router.push(`/calendar/${unixDate.value}`);
      appoId.value = null;
    };

    const onEditAppo = (id) => {
      appoId.value = null;
      editId.value = id;
      isAdding.value = false;
      router.push(`/calendar/${unixDate.value}`);
    };

    const onCancelEdit = () => {
      isHidingMain.value = false;
      editId.value = null;
      resetEZstates();
    };

    const onDoneEdit = (newDate, newAppoId) => {
      resetMain.value++; // reset component by increment its key
      editId.value = null;
      isAdding.value = false;
      router.push(`/calendar/${newDate}/${newAppoId}`);
      resetEZstates();
    };

    const onOpenAdding = () => {
      editId.value = null;
      isAdding.value = true;
    };

    const onCancelAdding = () => {
      isAdding.value = false;
      resetEZstates();
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
      faPlus,
      NAMvalue,
      resetMain,
      unixDate,
      scrollWidth,
      appoId,
      editId,
      isCompacting,
      isHidingMain,
      isAdding,
      EZstates,
      setEZstates,
      onMoveRight,
      onMoveLeft,
      onInputDate,
      onCompact,
      onSelectAppo,
      onSelectNAM,
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
  font-family: Arial;
  background-color: rgb(215, 215, 215);
  color: black;
}

#layout {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100%;
  margin-inline: auto;
  flex-grow: 1;
  box-sizing: border-box;
}

#relative {
  position: relative;
  z-index: 0;
}
#flexBox {
  padding: 10px 0px;
  display: flex;
  justify-content: end;
}
button {
  padding: 3px 15px;
  font-size: 15px;
}
</style>
