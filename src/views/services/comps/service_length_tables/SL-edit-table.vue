<template>
  <table border="1">
    <thead>
      <tr>
        <td colspan="2">
          <div id="title">
            <input
              type="date"
              v-if="setDate"
              id="datePicker"
              :value="date"
              @change="onSelectDate"
              required
            />
            <span id="date" v-else>{{ formatDate(date) }} ~</span>
          </div>
        </td>
      </tr>
      <tr>
        <th>Employee</th>
        <th>Service Length (minutes)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ALL</td>
        <td>
          <div id="flexBox">
            <input
              type="number"
              :value="defaultLength"
              @input="onInputDefaultLength"
              required
              min="5"
              step="1"
            />
          </div>
        </td>
      </tr>

      <tr v-for="(variation, index) in variations" :key="index">
        <td>
          <button class="redBtn" id="smallBtn" @click="removeVariation(index)">
            <FontAwesomeIcon :icon="removeIcon" /></button
          >&nbsp;
          <select
            :value="variation.employee_id"
            @change="onSelectEmployee(index, $event)"
            required
          >
            <option
              v-for="emp in employees"
              :key="emp.employee_id"
              :value="emp.employee_id"
            >
              {{ emp.alias }}
            </option>
          </select>
        </td>
        <td>
          <div id="flexBox">
            <input
              type="number"
              :value="variation.length"
              @input="onInputLength(index, $event)"
              required
              min="5"
              step="1"
            />
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="orangeBtn" id="smallBtn" @click.prevent="addVariation">
            <FontAwesomeIcon :icon="plusIcon" /> Employee
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import fetchEmployees from "../../../employees/apis/fetchEmployees";
import unixToReadable from "@/lib/unixToReadable";

export default {
  props: {
    variations: Object,
    defaultLength: String,
    date: String,

    addVariation: Function,
    removeVariation: Function,
    editVariation: Function,

    setDefaultLength: Function,
    setDate: Function,
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      plusIcon: faPlus,
      removeIcon: faTrashCan,

      // products
      seEmployeeID: null,
      employees: [],
    };
  },
  methods: {
    formatDate(unixTime) {
      return unixToReadable(unixTime);
    },
    onInputDefaultLength(event) {
      const value = event.target.value;
      if (value > 0) {
        this.setDefaultLength(value);
      }
    },
    onInputLength(index, event) {
      const value = event.target.value;
      if (value > 0) {
        this.editVariation(index, "length", value);
      }
    },
    onSelectEmployee(index, event) {
      this.editVariation(index, "employee_id", event.target.value);
    },
    onSelectDate(event) {
      this.setDate(event.target.value);
    },
  },
  async created() {
    this.employees = await fetchEmployees();
    this.employees = this.employees.filter((emp) => emp.is_active);
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
input {
  width: 100%;
}

th,
td {
  padding: 10px;
  text-align: left;
}

#flexBox {
  display: flex;
}
#date {
  color: rgb(160, 130, 40);
  font-size: 14px;
}
#smallBtn {
  cursor: pointer;
  font-size: 12px;
  padding: 5px;
}
#datePicker {
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  box-sizing: border-box;
}
</style>
