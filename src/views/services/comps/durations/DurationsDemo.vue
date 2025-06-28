<template>
  <div v-if="!isEditing">
    <table border="1">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Duration (minutes)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td>{{ row.name }}</td>
          <td>{{ row.duration / 60 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <DurationsEdit
    v-else
    :serviceId="serviceId"
    :duration="duration"
    :empDurations="empDurations"
    :onToogleEdit="onToogleEdit"
  />
  <button v-if="!isEditing" class="blueBtn" @click="onToogleEdit">
    <FontAwesomeIcon :icon="editIcon" /> Edit Durations
  </button>
</template>

<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// comps
import DurationsEdit from "./DurationsEdit.vue";

export default {
  props: {
    duration: Number,
    empDurations: Array,
    serviceId: Number,
  },
  components: {
    FontAwesomeIcon,
    DurationsEdit,
  },
  data() {
    return {
      // icon
      editIcon: faPenToSquare,
      // resources
      rows: [],
      // status
      isEditing: false,
    };
  },
  methods: {
    onToogleEdit() {
      this.isEditing = !this.isEditing;
    },
  },
  created() {
    this.rows.push({
      name: "ALL",
      duration: this.duration,
    });

    for (let e of this.empDurations) {
      this.rows.push({
        id: e.empId,
        name: e.alias,
        duration: e.duration,
      });
    }
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  max-width: 100vw;
}

th,
td {
  padding: 10px;
  text-align: left;
}

button {
  margin-top: 10px;
}
</style>
