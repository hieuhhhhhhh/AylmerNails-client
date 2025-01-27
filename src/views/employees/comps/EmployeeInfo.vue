<template>
  <div v-if="isFetched">
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
            <td><NA v-if="!last_date" /> {{ last_date }}</td>
          </tr>
          <tr>
            <th>Intervals:</th>
            <td>{{ formattedIntervals() }}</td>
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
        :intervals="intervals"
        :last_date="last_date"
        :setAlias="SetAlias"
        :setIntervals="setIntervals"
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
    <br />
    <br />

    <div id="title">Schedules:</div>
  </div>
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
      // states
      categories: [],
      alias: "",
      intervals: [],
      last_date: null,
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
    openEditForm() {
      this.isEditing = true;
    },
    closeEditForm() {
      this.$router.push("/employees/refresh");
    },
    formattedIntervals() {
      const interval1 = this.intervals[0];
      const interval2 = this.intervals[1];
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
    setIntervals(value) {
      this.intervals = value;
    },
    setLastDate(value) {
      this.last_date = value;
    },
  },
  async created() {
    const emp_id = this.$route.params.id;
    // fetch resources
    const [details, { categories, ES_ids }] = await Promise.all([
      fetchEmpDetails(emp_id),
      fetchEmployeeServices(emp_id),
    ]);
    this.categories = categories;
    this.ESs = ES_ids;

    // fetch state
    this.alias = details.alias;
    this.last_date = parseUT(details.last_date);
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
#title {
  display: flex;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-top: 3px var(--xtrans-gray) solid;
}
</style>