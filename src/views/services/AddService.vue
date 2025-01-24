<template>
  <form @submit.prevent="onSubmit">
    <table>
      <colgroup>
        <col style="width: auto" />
        <col style="width: 80%" />
      </colgroup>
      <tbody>
        <tr>
          <th>Name:</th>
          <td>
            <input type="text" :value="name" @input="setName" required />
          </td>
        </tr>

        <tr>
          <th>Category:</th>
          <td>
            <select :value="categoryId" @change="setCategory" required>
              <option
                v-for="cate in categories"
                :key="cate.cate_id"
                :value="cate.cate_id"
              >
                {{ cate.name }}
              </option>
              <option :value="'null'">*empty</option>
            </select>
          </td>
        </tr>

        <tr>
          <th>
            Default Length:<br />
            (minutes)
          </th>
          <td>
            <input type="number" required :min="1" />
          </td>
        </tr>
        <tr>
          <th>Description:</th>
          <td>
            <textarea
              id="description"
              type="text"
              rows="3"
              :value="description"
              @input="setDescription"
              required
            />
          </td>
        </tr>
        <tr>
          <th>Members:</th>
          <td>
            <div v-for="employee in employees" :key="employee.employee_id">
              <input
                id="check"
                type="checkbox"
                :value="employee.employee_id"
                v-model="checkedEmp"
              />
              <label>{{ employee.alias }}</label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <div id="addOn">
      <b>Additional Options:</b>
      <AOSsEdit
        :AOSs="AOSs"
        :editAOS="editAOS"
        :removeOption="removeOption"
        :addOption="addOption"
        :addQuestion="addQuestion"
        :removeQuestion="removeQuestion"
      />
      <button class="greenBtn">
        <FontAwesomeIcon :icon="saveIcon" /> <b>Confirm New Service</b>
      </button>
    </div>
  </form>
</template>

<script>
// comps
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
// lib
import fetchEmployees from "./apis/fetchEmployees";
import fetchCategories from "./apis/fetchCategories";
import AOSsEdit from "./comps/AOSs/AOSs-edit.vue";

export default {
  props: {
    serviceInfo: Object,
    isFetched: Boolean,
  },
  components: {
    FontAwesomeIcon,
    AOSsEdit,
  },
  data() {
    return {
      // icons
      saveIcon: faCheck,
      // states
      name: "",
      description: "",
      date: null,
      categoryId: "null",
      AOSs: [],
      checkedEmp: [],
      // resources
      categories: [],
      employees: [],
    };
  },
  methods: {
    editAOS(parentIndex, index, prop, value) {
      this.AOSs[parentIndex].options[index][prop] = value;
    },
    removeOption(parentIndex, index) {
      if (index > 0) {
        this.AOSs[parentIndex].options.splice(index, 1);
      }
    },
    addOption(parentIndex) {
      this.AOSs[parentIndex].options.push({ name: null, length_offset: null });
    },
    addQuestion() {
      const AOS = {};
      AOS.propmpt = null;
      AOS.options = [];
      AOS.options.push({ name: null, length_offset: null });
      this.AOSs.push(AOS);
    },
    removeQuestion(parentIndex) {
      this.AOSs.splice(parentIndex, 1);
    },
  },
  async created() {
    this.employees = await fetchEmployees();
    this.categories = await fetchCategories();
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
th,
td {
  padding: 10px;
  text-align: left;
}
#addOn {
  padding: 10px;
  border-top: 3px var(--xtrans-gray) solid;
  border-bottom: 3px var(--xtrans-gray) solid;
}

#duo {
  display: flex;
  gap: 15px;
}
#description {
  width: 100%;
}
#check {
  transform: scale(1.5);
  margin: 5px;
}
</style>