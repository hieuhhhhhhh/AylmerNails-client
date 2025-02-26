<template>
  <div>
    <div id="container">
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
        />
      </div>
      <button @click="onCancelEdit">Cancel</button>
      <button @click="onToogleScreen">Toogle</button>
    </div>
  </div>
</template>

<script>
// lib
import { onMounted, ref, watch } from "vue";
import fetchAppoDetails from "../../apis/fetchAppoDetails";
import { useRoute } from "vue-router";
// comps
import AppoEdit from "./AppoEdit.vue";

export default {
  name: "EditAppo",
  components: {
    AppoEdit,
  },
  props: {
    appoId: Number,
    onCancelEdit: Function,
    onSelectAppo: Function,
    onToogleScreen: Function,
  },
  setup(props) {
    // lib
    const route = useRoute();

    // outcomes
    const serviceName = ref("");
    const category = ref("");
    const AOSOsText = ref("");
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

    // payload setters
    const setServiceId = (value) => {
      serviceId.value = value;
    };
    const setAOSOs = (value) => {
      AOSOs.value = value;
    };
    const setEmpId = (value) => {
      empId.value = value;
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

    // apis
    const fetchDetails = async () => {
      if (!props.appoId) return;
      const details = await fetchAppoDetails(props.appoId);
      console.log("Fetched details:", details);

      // populate
      serviceName.value = String(details.serviceName);
      category.value = String(details.cateName);
      AOSOsText.value = Object(details.AOSOs);
      empAlias.value = String(details.empAlias);
      serviceId.value = Number(details.serviceId);
      empId.value = Number(details.empId);
      date.value = Number(details.date);
      start.value = Number(details.start);
      duration.value = Number(details.end - details.start);
      note.value = details.note;
      color.value = details.color;
    };

    // dependencies
    watch(() => props.appoId, fetchDetails);
    watch(
      () => route.path,
      () => {
        props.onToogleScreen(false);
      }
    );

    // life cycle
    onMounted(fetchDetails);

    return {
      setServiceId,
      setAOSOs,
      setEmpId,
      setDate,
      setStart,
      setDuration,
      setNote,
      serviceName,
      AOSOsText,
      category,
      empAlias,
      date,
      start,
      duration,
      note,
      color,
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