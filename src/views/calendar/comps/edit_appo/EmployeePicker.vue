<template>
  <button @click="onStopPicking" class="orangeBtn">
    <FontAwesomeIcon :icon="faLeftLong" /> Back
  </button>
  <div id="category">
    <div v-for="(emp, index) in employees" :key="index">
      <div
        id="service"
        :style="{ background: emp.color }"
        @click="onSelectEmp(emp.employee_id, emp.alias, emp.color)"
        v-if="!emp.last_date || date <= emp.last_date"
      >
        {{ emp.alias }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import fetchEmployees from "@/views/employees/apis/fetchEmployees";
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "Employees-",
  components: {
    FontAwesomeIcon,
  },
  props: {
    date: Number,
    setEmp: Function,
    onStopPicking: Function,
  },
  setup(props) {
    const employees = ref([]);

    const onSelectEmp = (empId, alias, color) => {
      props.setEmp(empId, alias, color);
    };

    onMounted(async () => {
      employees.value = await fetchEmployees();
      console.log("employees: ", employees.value);
    });

    return {
      employees,
      onSelectEmp,
      faLeftLong,
    };
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
  overflow: hidden;
  background-color: var(--background-i2);
  box-sizing: border-box;
  height: fit-content;
  gap: 10px;
}

#service {
  color: black;
  padding: 9px;
  padding-inline: 15px;
  font-size: 19px;
  border-top: 1px solid var(--xtrans-gray);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.1s ease-out;
}
#service:hover {
  background: gray !important;
}
#service:active {
  background: gray !important;
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
.orangeBtn {
  margin-bottom: 10px;
  font-size: 22px;
  position: sticky;
  top: 10px;
  left: 10px;
  z-index: 10;
}
</style>
