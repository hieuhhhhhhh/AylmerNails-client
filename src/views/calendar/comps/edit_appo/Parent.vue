<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      id="container"
      v-if="!isPickingEmp && !isPickingService && !isPickingContact"
    >
      <div id="title">Editing</div>
      <div id="content" :style="{ backgroundColor: color }">
        <AppoEdit
          :contactName="contactName"
          :phoneNum="phoneNum"
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
          :onOpenEmpPicker="onOpenEmpPicker"
          :onOpenServicePicker="onOpenServicePicker"
          :onSelectContact="onSelectContact"
        />
      </div>
      <button @click.prevent="onCancelEdit">Cancel</button>
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

    <ContactPicker
      v-if="isPickingContact"
      :setContact="setContact"
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
import fetchAppoLength from "../../apis/fetchAppoLength";
// comps
import AppoEdit from "./AppoEdit.vue";
import EmployeePicker from "./EmployeePicker.vue";
import ServicePicker from "./ServicePicker.vue";
import ContactPicker from "./ContactPicker.vue";

export default {
  name: "EditAppo",
  components: {
    AppoEdit,
    EmployeePicker,
    ServicePicker,
    ContactPicker,
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
    const isPickingContact = ref(false);
    // outcomes
    const serviceName = ref("");
    const category = ref("");
    const AOSOsText = ref([]);
    const empAlias = ref("");
    const color = ref("");
    const phoneNum = ref("");
    const contactName = ref("");
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

    const setContact = (newPhoneNum, newName) => {
      phoneNum.value = newPhoneNum;
      contactName.value = newName;
      onStopPicking();
    };

    const setService = async (
      newId,
      newName,
      newCate,
      newAOSOs,
      newAOSOsText
    ) => {
      serviceId.value = newId;
      serviceName.value = newName;
      category.value = newCate;
      AOSOs.value = newAOSOs;
      AOSOsText.value = newAOSOsText;
      await fetchDuration();
      onStopPicking();
    };

    const setEmp = async (newId, newAlias, newColor) => {
      empId.value = newId;
      empAlias.value = newAlias;
      color.value = newColor;
      console.log("empId", empId.value);
      await fetchDuration();

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
    const onSelectContact = () => {
      props.onHideMain(true);
      isPickingContact.value = true;
    };

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
      isPickingContact.value = false;
      props.onHideMain(false);
    };

    // APIS
    const fetchDuration = async () => {
      if (!serviceId.value) return;
      duration.value = await fetchAppoLength(
        serviceId.value,
        empId.value,
        AOSOs.value
      );
    };

    const fetchDetails = async () => {
      if (!props.appoId) return;
      const details = await fetchAppoDetails(props.appoId);
      console.log("Fetched details:", details);

      // populate
      phoneNum.value = String(details.phoneNum);
      contactName.value = String(details.contactName);
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
        phoneNum.value,
        contactName.value,
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
      isPickingContact,
      setContact,
      setService,
      setEmp,
      setDate,
      setStart,
      setDuration,
      setNote,
      resetEmp,
      resetService,
      contactName,
      phoneNum,
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
      onSelectContact,
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