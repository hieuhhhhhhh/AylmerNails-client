<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      id="container"
      v-if="!isPickingEmp && !isPickingService"
    >
      <div id="title">Editing</div>
      <div id="content" :style="{ backgroundColor: color }">
        <AppoEdit
          :serviceName="serviceName"
          :AOSOs="AOSOsText"
          :category="category"
          :empAlias="empAlias"
          :date="date"
          :start="start"
          :duration="duration"
          :note="note"
          :setDate="setDate"
          :setStart="setStart"
          :setDuration="setDuration"
          :setNote="setNote"
          :resetEmp="resetEmp"
          :resetService="resetService"
        />
      </div>
      <button @click.prevent="onCancelEdit">Cancel</button>
      <button @click.prevent="onOpenEmpPicker">Pick Emp</button>
      <button @click.prevent="onOpenServicePicker">Pick Service</button>
      <button>Save</button>
    </form>
    <EmployeePicker
      v-if="isPickingEmp"
      :date="date"
      :setEmp="setEmp"
      :onStopPicking="onStopPicking"
    />

    <ServicePicker
      v-if="isPickingService"
      :date="date"
      :setService="setService"
      :onStopPicking="onStopPicking"
    />
  </div>
</template>

<script>
// lib
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import fetchAppoDetails from "../../apis/fetchAppoDetails";
import updateAppo from "../../apis/updateAppo";
// comps
import AppoEdit from "./AppoEdit.vue";
import EmployeePicker from "./EmployeePicker.vue";
import ServicePicker from "./ServicePicker.vue";

export default {
  name: "EditAppo",
  components: {
    AppoEdit,
    EmployeePicker,
    ServicePicker,
  },
  props: {
    appoId: Number,
    onCancelEdit: Function,
    onSelectAppo: Function,
    onHideMain: Function,
    onDoneEdit: Function,
  },
  setup(props) {
    // lib
    const route = useRoute();
    // status
    const isPickingEmp = ref(false);
    const isPickingService = ref(false);
    // outcomes
    const serviceName = ref("");
    const category = ref("");
    const AOSOsText = ref([]);
    const empAlias = ref("");
    const color = ref("");
    // payload
    const serviceId = ref(null);
    const AOSOs = ref([]);
    const empId = ref(null);
    const date = ref(null);
    const start = ref(null);
    const duration = ref(null);
    const note = ref("");

    // SETTERS
    const resetEmp = () => {
      empAlias.value = "";
      empId.value = null;
      color.value = "white";
    };

    const resetService = () => {
      serviceName.value = "";
      serviceId.value = null;
      category.value = "";
      AOSOsText.value = [];
      AOSOs.value = [];
      color.value = "white";
    };

    const setService = (newId, newName, newCate, newAOSOs, newAOSOsText) => {
      serviceId.value = newId;
      serviceName.value = newName;
      category.value = newCate;
      AOSOs.value = newAOSOs;
      AOSOsText.value = newAOSOsText;
      onStopPicking();
    };

    const setEmp = (newId, newAlias, newColor) => {
      empId.value = newId;
      empAlias.value = newAlias;
      color.value = newColor;
      console.log("empId", empId.value);
      onStopPicking();
    };
    const setDate = (value) => {
      date.value = value;
    };
    const setStart = (value) => {
      start.value = value;
    };
    const setDuration = (value) => {
      duration.value = value;
    };
    const setNote = (value) => {
      note.value = value;
      console.log("new Note", value);
    };

    // INPUT HANDLE
    const onOpenEmpPicker = () => {
      props.onHideMain(true);
      isPickingEmp.value = true;
    };

    const onOpenServicePicker = () => {
      props.onHideMain(true);
      isPickingService.value = true;
    };

    const onStopPicking = () => {
      isPickingEmp.value = false;
      isPickingService.value = false;
      props.onHideMain(false);
    };

    // APIS
    const fetchDetails = async () => {
      if (!props.appoId) return;
      const details = await fetchAppoDetails(props.appoId);
      console.log("Fetched details:", details);

      // populate
      serviceName.value = String(details.serviceName);
      category.value = String(details.cateName);
      AOSOs.value = details.AOSOs;
      AOSOsText.value = details.AOSOsText;
      empAlias.value = String(details.empAlias);
      serviceId.value = Number(details.serviceId);
      empId.value = Number(details.empId);
      date.value = Number(details.date);
      start.value = Number(details.start);
      duration.value = Number(details.end - details.start);
      note.value = details.note;
      color.value = details.color;
    };

    const onSubmit = async () => {
      const newAppoId = await updateAppo(
        props.appoId,
        serviceId.value,
        AOSOs.value,
        empId.value,
        date.value,
        start.value,
        duration.value,
        note.value
      );
      if (newAppoId) {
        props.onDoneEdit(date.value, newAppoId);
      }
    };

    // DEPENDENT
    watch(() => props.appoId, fetchDetails);
    watch(
      () => route.path,
      () => {
        onStopPicking();
        props.onHideMain(false);
      }
    );

    // LIFECYCLE
    onMounted(fetchDetails);

    return {
      isPickingEmp,
      isPickingService,
      setService,
      setEmp,
      setDate,
      setStart,
      setDuration,
      setNote,
      resetEmp,
      resetService,
      serviceName,
      AOSOsText,
      category,
      empAlias,
      date,
      start,
      duration,
      note,
      color,
      onSubmit,
      onOpenEmpPicker,
      onOpenServicePicker,
      onStopPicking,
    };
  },
};
</script>

<style scoped>
#title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}
#container {
  padding: 20px;
  width: 500px;
  max-width: 100%;
  box-sizing: border-box;
}
#content {
  color: black;
}
#flexBox {
  display: flex;
  justify-content: center;
}
</style>