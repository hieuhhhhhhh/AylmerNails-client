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
            <button class="redBtn" @click.prevent="onCancelEdit">X</button>
          </div>
          <div id="top">
            <div id="title">Editing</div>
          </div>

          <div id="content" :style="{ backgroundColor: color }">
            <AppoEdit
              :contactName="contactName"
              :phoneNum="phoneNum"
              :serviceName="serviceName"
              :AOSOs="AOSOsText"
              :category="category"
              :empAlias="empAlias"
              :selectedEmps="selectedEmps"
              :date="date"
              :start="start"
              :duration="duration"
              :message="message"
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
              :onClearContact="onClearContact"
              :onClearService="onClearService"
            />
          </div>
          <div class="flexBox">
            <button id="save">
              <FontAwesomeIcon :icon="faCheck" />
              Finish
            </button>
          </div>
        </div>
      </div>
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
      :_phoneNum="phoneNum"
      :_name="contactName"
      :setContact="setContact"
      :onStopPicking="onStopPicking"
    />
  </div>
</template>

<script>
// lib
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
// apis
import fetchAppoDetails from "../../apis/fetchAppoDetails";
import updateAppo from "../../apis/updateAppo";
import fetchAppoLength from "../../apis/fetchAppoLength";
// comps
import AppoEdit from "./AppoEdit.vue";
import EmployeePicker from "./EmployeePicker.vue";
import ServicePicker from "./ServicePicker.vue";
import ContactPicker from "./ContactPicker.vue";
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "EditAppo",
  components: {
    FontAwesomeIcon,
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
    const selectedEmps = ref([]);
    const color = ref("");
    const phoneNum = ref("");
    const contactName = ref("");
    const message = ref("");
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

    const updateEZstates = () => {
      props.setEZstates(date.value, empId.value, start.value, duration.value);
    };

    // INPUT HANDLE
    const updateURL = () => {
      router.push(`/calendar/${route.params.unixDate}/selecting`);
    };

    const onSelectContact = () => {
      props.onHideMain(true);
      isPickingContact.value = true;
      updateURL();
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

    const onStopPicking = () => {
      onReset();
      router.push(`/calendar/${route.params.unixDate}`);
    };

    const onReset = () => {
      isPickingEmp.value = false;
      isPickingService.value = false;
      isPickingContact.value = false;
      props.onHideMain(false);
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

    const fetchDetails = async () => {
      if (!props.appoId) return;
      const details = await fetchAppoDetails(props.appoId);
      console.log("Fetched details:", details);

      // populate
      phoneNum.value = details.phoneNum;
      contactName.value = details.contactName;
      serviceName.value = details.serviceName;
      category.value = details.cateName;
      AOSOs.value = details.AOSOs;
      AOSOsText.value = details.AOSOsText;
      empAlias.value = details.empAlias;
      serviceId.value = details.serviceId;
      empId.value = details.empId;
      selectedEmps.value = details.selectedEmps;
      date.value = details.date;
      start.value = details.start;
      duration.value = details.end - details.start;
      message.value = details.message;
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
        selectedEmps.value.map((emp) => emp.empId),
        message.value,
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
        setDate(value.date);
      }
    );

    watch([date, empId, start, duration], () => {
      updateEZstates();
    });

    // LIFECYCLE
    onMounted(fetchDetails);

    return {
      faCheck,
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
      selectedEmps,
      date,
      start,
      duration,
      message,
      note,
      color,
      onSubmit,
      onSelectContact,
      onOpenEmpPicker,
      onOpenServicePicker,
      onStopPicking,
      onClearContact,
      onClearService,
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
  box-shadow: 0 0 10px var(--shadow-color);
  margin: 10px;
  max-width: 100%;
}
#save {
  padding: 5px;
  padding-inline: 15px;
  /* font-weight: bold; */
  font-size: 15px;
}
</style>