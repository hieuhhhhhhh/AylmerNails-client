<template>
  <form @submit.prevent="onSubmit">
    <div v-for="employee in employees" :key="employee.employee_id">
      <input
        id="check"
        type="checkbox"
        :value="employee.employee_id"
        :disabled="!isEditing"
        v-model="checked"
      />
      <label>{{ employee.alias }}</label>
    </div>

    <button v-if="!isEditing" class="blueBtn" @click="openEditMode">
      <FontAwesomeIcon :icon="editIcon" /> Edit Technicians
    </button>
    <div v-else id="duo">
      <button class="redBtn" @click="closeEditMode">
        <FontAwesomeIcon :icon="cancelIcon" /> Cancel
      </button>
      <button class="greenBtn">
        <FontAwesomeIcon :icon="saveIcon" /> Save Changes
      </button>
    </div>
  </form>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import fetchServiceEmployees from "../apis/fetchSEs";
import updateSEs from "../apis/updateSEs";
export default {
  props: {
    serviceId: Number,
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      // icon
      editIcon: faPenToSquare,
      cancelIcon: faCancel,
      saveIcon: faCheck,
      // status
      isEditing: false,
      // products
      employees: [],
      checked: [],
    };
  },
  methods: {
    openEditMode() {
      this.isEditing = true;
    },
    async closeEditMode() {
      this.isEditing = false;
      await this.fetchData();
    },
    async onSubmit() {
      const res = await updateSEs(this.serviceId, this.checked);
      if (res) {
        this.$router.push("/services/refresh");
      }
    },
    async fetchData() {
      this.employees = await fetchServiceEmployees(this.serviceId);
      this.employees.forEach((employee) => {
        if (employee.service_id) {
          this.checked.push(employee.employee_id);
        }
      });
    },
  },
  async created() {
    await this.fetchData();
  },
};
</script>
<style scoped>
#check {
  transform: scale(2);
  margin: 10px;
}
#duo {
  display: flex;
  gap: 15px;
}
</style>
