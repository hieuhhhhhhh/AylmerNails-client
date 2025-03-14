<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      id="container"
      v-if="!isPickingEmp && !isPickingService && !isPickingContact"
    >
      <div id="title">New Appointment</div>
      <div id="content" :style="{ backgroundColor: color }">
        <AddForm
          :contactId="contactId"
          :clientName="clientName"
          :phoneNum="phoneNum"
          :serviceName="serviceName"
          :AOSOs="AOSOsText"
          :category="category"
          :empAlias="empAlias"
          :date="unixDate"
          :start="start"
          :duration="duration"
          :note="note"
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
      <button @click.prevent="onCancelAdding">Cancel</button>
      <button>Confirm</button>
    </form>
    <EmployeePicker
      v-if="isPickingEmp"
      :date="unixDate"
      :setEmp="setEmp"
      :onStopPicking="onStopPicking"
    />

    <ServicePicker
      v-if="isPickingService"
      :date="unixDate"
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
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import fetchAppoLength from "../../apis/fetchAppoLength";
import addAppo from "../../apis/addAppo";
// comps
import AddForm from "./AddForm.vue";
import EmployeePicker from "../edit_appo/EmployeePicker.vue";
import ServicePicker from "../edit_appo/ServicePicker.vue";
import ContactPicker from "../edit_appo/ContactPicker.vue";

export default {
  name: "EditAppo",
  components: {
    AddForm,
    EmployeePicker,
    ServicePicker,
    ContactPicker,
  },
  props: {
    unixDate: Number,
    onCancelAdding: Function,
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
    const color = ref("white");
    const contactId = ref(null);
    const phoneNum = ref("");
    const clientName = ref("");
    // payload
    const serviceId = ref(null);
    const AOSOs = ref([]);
    const empId = ref(null);
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

    const setContact = (newId, newPhoneNum, newName) => {
      contactId.value = newId;
      phoneNum.value = newPhoneNum;
      clientName.value = newName;
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

    const onSelectContact = () => {
      props.onHideMain(true);
      isPickingContact.value = true;
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
    const onSubmit = async () => {
      const newId = await addAppo(
        serviceId.value,
        AOSOs.value,
        empId.value,
        props.unixDate,
        start.value,
        duration.value,
        note.value
      );
      if (newId) {
        props.onDoneEdit(props.unixDate, newId);
      }
    };

    // DEPENDENT
    watch(
      () => route.path,
      () => {
        onStopPicking();
        props.onHideMain(false);
      }
    );

    return {
      isPickingEmp,
      isPickingService,
      isPickingContact,
      setContact,
      setService,
      setEmp,
      setStart,
      setDuration,
      setNote,
      resetEmp,
      resetService,
      contactId,
      phoneNum,
      clientName,
      serviceName,
      AOSOsText,
      category,
      empAlias,
      start,
      duration,
      note,
      color,
      onSubmit,
      onOpenEmpPicker,
      onOpenServicePicker,
      onSelectContact,
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