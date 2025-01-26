<template>
  <div></div>
  <button class="blueBtn" id="plus" @click="navigateAddEmp()">
    <FontAwesomeIcon :icon="plusIcon" /> Add Employee
  </button>
</template>

<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// lib
import fetchEmployees from "./apis/fetchEmployees";

export default {
  name: "Employees-",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      employees: [],
      plusIcon: faPlus,
    };
  },
  methods: {
    navigateAddEmp() {
      this.$router.push(`/employees/add_employee`);
    },
  },
  async created() {
    this.employees = await fetchEmployees();
    console.log("employees: ", this.employees);
  },
};
</script>

