<template>
  <form @submit.prevent="onSubmit">
    <table border="1">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Duration (minutes)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ALL</td>
          <td>
            <div id="flexBox">
              <input
                type="number"
                :value="duration / 60"
                @input="onInputDuration(0, $event)"
                required
                min="5"
                step="1"
              />
            </div>
          </td>
        </tr>
        <tr v-for="(row, index) in rows.slice(1)" :key="index">
          <td>{{ row.name }}</td>
          <td>
            <div id="flexBox">
              <input
                type="number"
                :value="row.duration / 60"
                @input="onInputDuration(index + 1, $event)"
                required
                min="5"
                step="1"
              />
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <form @submit.prevent="onAddRow">
              <select v-model="seEmp" required>
                <option
                  v-for="emp in employees"
                  :key="emp.employee_id"
                  :value="{ empId: emp.employee_id, alias: emp.alias }"
                >
                  {{ emp.alias }}
                </option>
              </select>

              <button class="orangeBtn" id="smallBtn">Add</button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
    <div id="duo">
      <button class="redBtn" @click="onToogleEdit">Cancel</button>
      <button class="greenBtn" type="submit">Save</button>
    </div>
  </form>
</template>

<script>
// lib
import { onMounted, ref } from "vue";
import fetchEmployees from "../../../employees/apis/fetchEmployees";
import updateDurations from "../../apis/updateDurations";
import { useRouter } from "vue-router";

export default {
  props: {
    serviceId: Number,
    duration: Number,
    onToogleEdit: Function,
    empDurations: Array,
  },
  setup(props) {
    // lib
    const router = useRouter();

    // resources
    const rows = ref([]);
    const seEmp = ref(null);
    const employees = ref([]);

    const onInputDuration = (index, event) => {
      const newDuration = event.target.value * 60;
      rows.value[index].duration = newDuration;
    };

    const onAddRow = () => {
      for (let row of rows.value) {
        if (row.empId === seEmp.value.empId) return;
      }

      rows.value.push({
        empId: seEmp.value.empId,
        name: seEmp.value.alias,
        duration: null,
      });
    };

    const onSubmit = async () => {
      const res = await updateDurations(props.serviceId, rows.value);
      if (res) {
        router.push("/services/refresh");
      }
    };

    onMounted(async () => {
      rows.value.push({
        name: "ALL",
        duration: props.duration,
      });

      for (let e of props.empDurations) {
        rows.value.push({
          empId: e.empId,
          name: e.alias,
          duration: e.duration,
        });
      }

      // fetch employee list
      employees.value = await fetchEmployees();
      console.log("employees", employees.value);
    });

    return {
      rows,
      seEmp,
      employees,
      onInputDuration,
      onAddRow,
      onSubmit,
    };
  },
};
</script>


<style scoped>
table {
  border-collapse: collapse;
  max-width: 100vw;
}
select {
  font-size: 18px;
}

th,
td {
  padding: 10px;
  text-align: left;
}
#duo {
  display: flex;
  gap: 15px;
}
button {
  margin-top: 10px;
}
#smallBtn {
  cursor: pointer;
  font-size: 12px;
  padding: 5px;
  margin-left: 10px;
}
</style>
