<template>
  <div v-if="isFetched">
    <div id="note">*Intervals are not editable</div>
    <table>
      <colgroup>
        <col style="width: auto" />
        <col style="width: 80%" />
      </colgroup>
      <tbody>
        <tr>
          <th>Name:</th>
          <td>{{ details.alias }}</td>
        </tr>
        <tr>
          <th>Available Until:</th>
          <td><NA v-if="!last_date" /> {{ details.last_date }}</td>
        </tr>
        <tr>
          <th>Intervals:</th>
          <td>{{ details.intervals }}</td>
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
      />
    </div>
    <button class="blueBtn" @click="openEditForm">
      <FontAwesomeIcon :icon="editIcon" /> Edit Employee Details
    </button>
  </div>
</template>

<script>
// comps
import NA from "@/components/NotAvailable.vue";
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import fetchEmployeeServices from "../apis/fetchESs";
import Category from "./Category.vue";
// lib
import fetchEmpDetails from "../apis/fetchEmpDetails";

export default {
  components: {
    NA,
    FontAwesomeIcon,
    Category,
  },
  data() {
    return {
      // icons
      editIcon: faPenToSquare,
      // status
      isFetched: false,
      // states
      details: {},
      categories: [],
      ESs: new Set(),
    };
  },
  methods: {
    checkService(serviceId) {
      this.ESs.add(serviceId);
    },
    uncheckService(serviceId) {
      this.ESs.delete(serviceId);
    },
  },
  async created() {
    this.emp_id = this.$route.params.id;
    // fetch resources
    const [details, categories] = await Promise.all([
      fetchEmpDetails(this.emp_id),
      fetchEmployeeServices(this.inId),
    ]);
    this.details = details;
    this.categories = categories;
    this.isFetched = true;
  },
};
</script>

<style scoped>
table {
  text-align: left;
}
th,
td {
  padding: 10px;
  text-align: left;
}

#note {
  padding: 10px;
  padding-top: 0px;
  font-style: italic;
  color: rgb(184, 121, 3);
}
</style>