<template>
  <div id="category">
    <div
      id="service"
      :class="{ faded: !employee.is_active }"
      v-for="(employee, index) in employees"
      :key="index"
      @click="navigateEmp(employee.employee_id)"
    >
      {{ employee.alias }}
      <div class="faded" v-if="!employee.is_active">
        ended on {{ formatDate(employee.last_date) }}
      </div>
    </div>
  </div>
  <br />
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
import unixToReadable from "@/lib/unixToReadable";

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
    navigateEmp(employee_id) {
      this.$router.push(`/employees/details/${employee_id}`);
    },
    formatDate(unix) {
      return unixToReadable(unix);
    },
  },
  async created() {
    this.employees = await fetchEmployees();
    console.log("employees: ", this.employees);
  },
};
</script>

<style scoped>
#category {
  box-shadow: 0 0 5px var(--shadow-color);
  width: fit-content;
  max-width: 90vw;
  min-width: min(350px, 90vw);
  border-radius: 5px;
  background-color: var(--background-i2);
  box-sizing: border-box;
  height: fit-content;
  gap: 10px;
}

#service {
  padding: 9px;
  padding-inline: 15px;
  font-size: 19px;
  border-top: 1px solid var(--xtrans-gray);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#service:hover {
  background: var(--hover);
}
#service:active {
  background: var(--active);
}
.faded {
  color: gray;
  padding-left: 20px;
  font-size: 14px;
}
/* phone view */
@media (orientation: portrait) {
  #service {
    padding: 13px;
  }
}
</style>