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
          <td id="flexBox">
            <input type="text" v-model="name" required />
          </td>
        </tr>

        <tr>
          <th>Category:</th>
          <td id="flexBox">
            <select v-model="categoryId" required>
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
          <td id="flexBox">
            <input type="number" v-model="length" required :min="1" />
          </td>
        </tr>
        <tr>
          <th>Description:</th>
          <td id="flexBox">
            <textarea
              id="description"
              type="text"
              rows="3"
              v-model="description"
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
        :onInputQuestion="onInputQuestion"
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
import AOSsEdit from "./comps/AOSs/AOSs-edit.vue";
// lib
import fetchEmployees from "./apis/fetchEmployees";
import fetchCategories from "./apis/fetchCategories";
import addService from "./apis/addService";
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
      length: null,
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
      this.AOSs[parentIndex].options.push({ name: null, length_offset: 0 });
    },
    addQuestion() {
      const AOS = {};
      AOS.propmpt = null;
      AOS.options = [];
      AOS.options.push({ name: null, length_offset: 0 });
      this.AOSs.push(AOS);
    },
    removeQuestion(parentIndex) {
      this.AOSs.splice(parentIndex, 1);
    },
    onInputQuestion(parentIndex, value) {
      this.AOSs[parentIndex].prompt = value;
    },

    // submit api
    async onSubmit() {
      if (this.categoryId == "null") {
        this.categoryId = null;
      }

      const service_id = await addService(
        this.name,
        this.categoryId,
        this.description,
        this.length * 60,
        this.AOSs,
        this.checkedEmp
      );

      // navigate to that new service
      if (service_id) {
        this.$router.push(`/services/details/${service_id}`);
      }
    },
  },
  async created() {
    this.employees = await fetchEmployees();
    this.categories = await fetchCategories();
  },
};
</script>

<style scoped>
input,
textarea {
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
#addOn {
  padding: 10px;
  border-top: 3px var(--xtrans-gray) solid;
  border-bottom: 3px var(--xtrans-gray) solid;
}

#duo {
  display: flex;
  gap: 15px;
}

#check {
  transform: scale(1.5);
  margin: 5px;
}
</style>