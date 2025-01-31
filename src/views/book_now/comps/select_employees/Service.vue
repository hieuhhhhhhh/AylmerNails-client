<template>
  <div id="bar">
    <div id="card">
      <div id="flexBox">
        <span id="name">{{ name }}</span>

        <span id="item"> <FontAwesomeIcon :icon="dollarIcon" /> 60+</span>
        <span id="item"
          ><FontAwesomeIcon :icon="timeIcon" /> {{ length / 60 }}m+</span
        >
      </div>
      <div id="des">{{ description }}</div>
      <br />
      <div id="technicians">
        <div>
          <input
            id="check"
            type="checkbox"
            :checked="checked.length == max"
            @change="onCheckAll"
          />
          <label>All</label>
        </div>
        <div v-for="employee in employees" :key="employee.employee_id">
          <input
            id="check"
            type="checkbox"
            :value="employee.employee_id"
            v-model="checked"
            @change="onCheck"
          />
          <label>{{ employee.alias }}</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faClock, faDollarSign } from "@fortawesome/free-solid-svg-icons";
// library
import fetchServicePreview from "../../apis/fetchServicePreview";
import fetchServiceEmployees from "@/views/services/apis/fetchSEs";

export default {
  name: "Service-",
  props: {
    serviceId: Number,
    onInputEmpIds: Function,
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      timeIcon: faClock,
      dollarIcon: faDollarSign,
      // resources
      employees: [],
      checked: [],
      checkedAll: [],
      max: 0,
      // products
      name: "",
      description: "",
      length: "",
    };
  },
  methods: {
    onCheck() {
      this.onInputEmpIds(this.serviceId, this.checked);
    },
    onCheckAll(event) {
      const value = event.target.value;
      if (value) {
        this.checkAll();
      }
    },
    checkAll() {
      this.checked = [...this.checkedAll];
      this.onCheck();
    },
  },

  async created() {
    const preview = await fetchServicePreview(this.serviceId);
    this.name = preview.name;
    this.description = preview.description;
    this.length = preview.length;

    this.employees = await fetchServiceEmployees(this.serviceId);
    this.employees.forEach((e) => {
      this.max++;
      this.checkedAll.push(e.employee_id);
    });

    this.checkAll();
    console.log("empIds: ", this.employeeIds);
  },
};
</script>

<style scoped>
#technicians {
  border-top: 2px solid var(--xtrans-gray);
  padding: 5px;
}
#check {
  transform: scale(2);
  margin: 10px;
}
#bar {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#card {
  box-shadow: 0 0 5px var(--shadow-color);
  max-width: 90vw;
  padding: 10px;
  margin: 3px;
  width: 350px;
  border-radius: 5px;
  background-color: var(--background-i2);
  box-sizing: border-box;
  height: fit-content;
}
#name {
  font-weight: bold;
  font-size: 23px;
  flex: 2;
}

#flexBox {
  display: flex;
  align-items: center;
}
#item {
  flex: 1;
  text-align: right;
}
#des {
  margin-top: 3px;
  padding-inline: 10px;
}
</style>
