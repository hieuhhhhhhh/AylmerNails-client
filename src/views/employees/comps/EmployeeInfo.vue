<template>
  <form @submit.prevent="onSubmit" v-if="isFetched">
    <div v-if="!isEditing">
      <table>
        <colgroup>
          <col style="width: auto" />
          <col style="width: 80%" />
        </colgroup>
        <tbody>
          <tr>
            <th>Name:</th>
            <td>{{ alias }}</td>
          </tr>
          <tr>
            <th>Available Until:</th>
            <td><NA v-if="!formattedDate" /> {{ formattedDate }}</td>
          </tr>
          <tr>
            <th>Intervals:</th>
            <td>{{ formattedIntervals(intervals) }}</td>
          </tr>
          <tr>
            <th>Services:</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <EditEmpInfo
        :alias="alias"
        :last_date="last_date"
        :setAlias="setAlias"
        :setLastDate="setLastDate"
      />
    </div>

    <div id="categories" :key="resetCheckers">
      <Category
        v-for="(category, index) in categories"
        :key="index"
        :isEditing="isEditing"
        :category="category"
        :checkService="checkService"
        :uncheckService="uncheckService"
        :uncheckedAll="false"
      />
    </div>
    <br />

    <button v-if="!isEditing" class="blueBtn" @click.prevent="openEditForm">
      <FontAwesomeIcon :icon="editIcon" /> Edit Employee Details
    </button>
    <div v-else id="duo">
      <button class="redBtn" @click.prevent="closeEditForm">
        <FontAwesomeIcon :icon="cancelIcon" /> Cancel
      </button>
      <button class="greenBtn">
        <FontAwesomeIcon :icon="saveIcon" /> Save Changes
      </button>
    </div>
  </form>
</template>

<script>
// comps
import NA from "@/components/NotAvailable.vue";
import Category from "./Category.vue";
import EditEmpInfo from "./EditEmpInfo.vue";
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// lib
import fetchEmpDetails from "../apis/fetchEmpDetails";
import fetchEmployeeServices from "../apis/fetchESs";
import parseUT from "@/lib/parseUT";
import updateEmpInfo from "../apis/updateEmpInfo";
import unixToReadable from "@/lib/unixToReadable";
import parseDate from "@/lib/parseDate";

export default {
  components: {
    NA,
    FontAwesomeIcon,
    Category,
    EditEmpInfo,
  },
  data() {
    return {
      // icons
      editIcon: faPenToSquare,
      cancelIcon: faCancel,
      saveIcon: faCheck,
      // status
      isFetched: false,
      isEditing: false,
      resetCheckers: 0,
      // resources
      formattedDate: "",
      // submit
      emp_id: null,
      categories: [],
      alias: "",
      last_date: null,
      ESs: new Set(),
      intervals: [],
    };
  },
  methods: {
    checkService(serviceId) {
      this.ESs.add(serviceId);
    },
    uncheckService(serviceId) {
      this.ESs.delete(serviceId);
    },
    openEditForm() {
      this.isEditing = true;
    },
    closeEditForm() {
      this.$router.push("/employees/refresh");
    },
    formattedIntervals(intervals) {
      const interval1 = intervals[0];
      const interval2 = intervals[1];
      let res = "";

      if (interval1 != interval2) {
        res = `${interval1} and ${interval2}`;
      } else {
        res = `${interval1}`;
      }
      return res;
    },
    setAlias(value) {
      this.alias = value;
    },
    setLastDate(value) {
      this.last_date = value;
    },
    async onSubmit() {
      const res = await updateEmpInfo(
        this.emp_id,
        this.alias,
        parseDate(this.last_date),
        this.ESs
      );
      if (res) {
        this.$router.push("/employees/refresh");
      }
    },
  },
  async created() {
    this.emp_id = this.$route.params.id;
    // fetch resources
    const [details, { categories, ES_ids }] = await Promise.all([
      fetchEmpDetails(this.emp_id),
      fetchEmployeeServices(this.emp_id),
    ]);
    this.categories = categories;
    this.ESs = ES_ids;

    // fetch state
    this.alias = details.alias;
    this.last_date = parseUT(details.last_date);
    this.formattedDate = unixToReadable(details.last_date);
    this.intervals = details.key_intervals;

    // update status
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
</style>