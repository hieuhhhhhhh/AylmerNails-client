<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      id="container"
      v-if="!isPickingEmp && !isPickingService && !isPickingContact"
    >
      <div class="flexBox">
        <div id="box">
          <div id="closeBox">
            <button class="redBtn" @click.prevent="onCancelAdding">X</button>
          </div>
          <div id="top">
            <div id="title">New Appointment</div>
          </div>

          <div id="content" :style="{ backgroundColor: color }">
            <AddForm
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
              :onClearContact="onClearContact"
              :onClearService="onClearService"
            />
          </div>
          <div class="flexBox">
            <button class="greenBtn">Create</button>
          </div>
        </div>
      </div>
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
import { useRoute, useRouter } from "vue-router";
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
    NAMvalue: Object,
    setEZstates: Function,
  },
  setup(props) {
    // lib
    const route = useRoute();
    const router = useRouter();
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

    const setContact = (newPhoneNum, newName) => {
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

    const updateEZstates = () => {
      props.setEZstates(
        props.unixDate,
        empId.value,
        start.value,
        duration.value
      );
    };

    // INPUT HANDLE
    const updateURL = () => {
      router.push(`/calendar/${route.params.unixDate}/selecting`);
    };

    const onOpenEmpPicker = () => {
      props.onHideMain(true);
      isPickingEmp.value = true;
      updateURL();
    };

    const onOpenServicePicker = () => {
      props.onHideMain(true);
      isPickingService.value = true;
      updateURL();
    };

    const onSelectContact = () => {
      props.onHideMain(true);
      isPickingContact.value = true;
      updateURL();
    };

    const onReset = () => {
      isPickingEmp.value = false;
      isPickingService.value = false;
      isPickingContact.value = false;
      props.onHideMain(false);
    };

    const onStopPicking = () => {
      onReset();
      router.push(`/calendar/${route.params.unixDate}`);
    };

    const onClearContact = () => {
      setContact(null, null);
    };

    const onClearService = () => {
      setService(null, "", "", [], []);
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
        phoneNum.value,
        clientName.value,
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
      (value) => {
        if (!value.endsWith("selecting")) {
          onReset();
        }
      }
    );

    watch(
      () => props.NAMvalue,
      (value) => {
        start.value = value.start;
        setEmp(value.empId, value.empAlias, value.color);
      }
    );

    watch([() => props.unixDate, empId, start, duration], () => {
      updateEZstates();
    });

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
      onClearContact,
      onClearService,
    };
  },
};
</script>

<style scoped>
#title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
#container {
  box-sizing: border-box;
}
#content {
  max-width: 100%;
  width: 500px;
  color: black;
}
.flexBox {
  display: flex;
  justify-content: center;
  margin: 5px;
}
#top {
  display: flex;
  justify-content: center;
  margin-top: -20px;
}
#closeBox {
  display: flex;
  justify-content: flex-end;
}
.redBtn {
  border-radius: 0px;
  width: 34px;
  aspect-ratio: 1;
  border: none;
}
#box {
  background: var(--background-i2);
  max-width: 100%;
  box-shadow: 0 0 10px var(--shadow-color);
  margin: 10px;
}
</style>