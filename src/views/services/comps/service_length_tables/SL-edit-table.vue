<template>
  <div>
    <table border="1">
      <thead>
        <tr>
          <td colspan="2">
            <div id="title">
              <span v-if="date" id="date">{{ date }}</span>
              <button v-if="setDate" class="orangeBtn" id="smallBtn">
                Select Date
              </button>
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
            <input
              type="number"
              :value="defaultLength"
              @input="onInputDefaultLength"
              required
              min="1"
            />
          </td>
        </tr>

        <tr v-for="(variation, index) in variations" :key="index">
          <td>
            <select
              :value="variation.employee_id"
              @change="handleChange"
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
            <input
              type="number"
              :value="variation.length"
              @input="onInputLength(index, $event)"
              required
              min="1"
            />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <button class="orangeBtn" id="smallBtn" @click="addVariation">
              <FontAwesomeIcon :icon="plusIcon" /> Add a Variation
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons

import fetchEmployees from "../../apis/fetchEmployees";
export default {
  props: {
    variations: Object,
    defaultLength: Number,
    date: Number,

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

      // states
      seEmployeeID: null,
      employees: [],
    };
  },
  methods: {
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
    onInputEmployeeId(index, event) {
      this.editVariation(index, "employee_id", event.target.value);
    },
  },
  async created() {
    this.employees = await fetchEmployees();
    console.log("employees: ", this.employees);
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

#date {
  color: rgb(160, 130, 40);
  /* color: gray; */
}
#smallBtn {
  cursor: pointer;
  font-size: 12px;
  padding: 5px;
}
</style>
