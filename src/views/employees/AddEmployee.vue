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
          <th>Ideal Length:<br />(minutes)</th>
          <td id="flexBox">
            <input
              type="number"
              v-model="interval1"
              required
              :min="5"
              step="1"
            />
          </td>
        </tr>
        <tr>
          <th>
            Another Ideal Length:<br />
            (Optional)
          </th>
          <td id="flexBox">
            <input type="number" v-model="interval2" :min="5" step="1" />
          </td>
        </tr>
        <tr>
          <th>Services:</th>
        </tr>
      </tbody>
    </table>
    <div id="categories">
      <Category
        v-for="(category, index) in categories"
        :key="index"
        :isEditing="true"
        :category="category"
        :checkService="checkService"
        :uncheckService="uncheckService"
        :uncheckedAll="true"
      />
    </div>
    <br />
    <button class="greenBtn">
      <FontAwesomeIcon :icon="saveIcon" /> <b>Confirm New Employee</b>
    </button>
  </form>
</template>

<script>
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// comps
import Category from "./comps/Category.vue";
// lib
import fetchEmployeeServices from "./apis/fetchESs.js";
import addEmployee from "./apis/addEmployee.js";

export default {
  components: {
    FontAwesomeIcon,
    Category,
  },
  data() {
    return {
      // icon
      saveIcon: faCheck,
      // states
      categories: [],
      ESs: new Set(),
      name: "",
      interval1: null,
      interval2: null,
    };
  },
  methods: {
    checkService(serviceId) {
      this.ESs.add(serviceId);
    },
    uncheckService(serviceId) {
      this.ESs.delete(serviceId);
    },
    async onSubmit() {
      // parse intervals
      const intervals = [];
      intervals.push(this.interval1);
      if (this.interval2) intervals.push(this.interval2);
      else intervals.push(this.interval1);

      console.log("intervals: ", intervals);

      // parse ESs
      const res = await addEmployee(this.name, intervals, Array.from(this.ESs));

      if (res) {
        this.$router.push(`/employees/details/${res}`);
      }
    },
  },
  async created() {
    this.categories = (await fetchEmployeeServices(1)).categories;
  },
};
</script>

<style scoped>
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
#check {
  transform: scale(2);
  margin: 10px;
}
#categories {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>