<template>
  <DeleteBtn v-if="deletable" :empId="emp_id" />
  <div class="warning" v-if="lastDateCC > 0" @click="toConflictPage">
    Warning: Availability has {{ lastDateCC }}
    <u>conflicting appointment(s)</u>
  </div>
  <div class="warning" v-if="scheduleCC > 0" @click="toScheduleConflictPage">
    Warning: Schedule(s) have {{ scheduleCC }}
    <u>conflicting appointment(s)</u>
  </div>
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
            <th>Color:</th>
            <td :style="{ color: colorCode }">{{ colorName }}</td>
          </tr>

          <tr>
            <th>Available Until:</th>
            <td><NA v-if="!formattedDate" /> {{ formattedDate }}</td>
          </tr>
          <tr>
            <th>Ideal Lengths:<br />(minutes)</th>
            <td>{{ formattedIntervals(intervals) }}</td>
          </tr>
          <tr>
            <th>Ideal Percentage:</th>
            <td>{{ intervalPercent }}%</td>
          </tr>
          <tr>
            <th>Services:</th>
            <td><NA v-if="!categories.length" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <EditEmpInfo
        :alias="alias"
        :colorId="colorId"
        :last_date="last_date"
        :interval_percent="intervalPercent"
        :setAlias="setAlias"
        :setColorId="setColorId"
        :setLastDate="setLastDate"
        :setIntervalPercent="setIntervalPercent"
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
import DeleteBtn from "./delete_btn/DeleteBtn.vue";
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
import getTodayUnixTime from "@/lib/getTodayUnixTime";

export default {
  components: {
    NA,
    FontAwesomeIcon,
    Category,
    EditEmpInfo,
    DeleteBtn,
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
      deletable: false,
      // resources
      formattedDate: "",
      colorName: "",
      colorCode: null,
      // outcome
      emp_id: null,
      categories: [],
      alias: "",
      colorId: null,
      last_date: null,
      ESs: new Set(),
      intervals: [],
      intervalPercent: null,
      lastDateCC: 0,
      scheduleCC: 0,
    };
  },
  methods: {
    async fetchData() {
      this.emp_id = this.$route.params.id;
      // fetch resources
      const [details, { categories, ES_ids }] = await Promise.all([
        fetchEmpDetails(this.emp_id),
        fetchEmployeeServices(this.emp_id),
      ]);
      if (!details) return;
      this.categories = categories;
      this.ESs = ES_ids;

      // fetch state
      this.alias = details.alias;
      this.colorId = details.colorId;
      this.colorName = details.colorName;
      this.colorCode = details.colorCode;
      this.last_date = parseUT(details.last_date);
      if (details.last_date) {
        this.deletable = details.last_date < getTodayUnixTime();
      }
      this.formattedDate = unixToReadable(details.last_date);
      this.intervals = details.key_intervals;
      this.intervalPercent = details.interval_percent;
      this.lastDateCC = details.lastDateCC;
      this.scheduleCC = details.scheduleCC;

      // update status
      this.isFetched = true;
      // reset checkers
      this.resetCheckers++;
    },
    toConflictPage() {
      this.$router.push(`/conflicts/employee_ld/${this.emp_id}`);
    },
    toScheduleConflictPage() {
      this.$router.push(`/conflicts/schedule/${this.emp_id}`);
    },
    checkService(serviceId) {
      this.ESs.add(serviceId);
    },
    uncheckService(serviceId) {
      this.ESs.delete(Number(serviceId));
      console.log("ESs", this.ESs);
    },
    openEditForm() {
      this.isEditing = true;
    },
    async closeEditForm() {
      this.isEditing = false;
      await this.fetchData();
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
    setColorId(value) {
      this.colorId = value;
    },
    setLastDate(value) {
      this.last_date = value;
    },
    setIntervalPercent(value) {
      this.intervalPercent = value;
    },
    async onSubmit() {
      const res = await updateEmpInfo(
        this.emp_id,
        this.alias,
        this.colorId,
        this.intervalPercent,
        parseDate(this.last_date),
        [...this.ESs]
      );
      if (res) {
        this.$router.push("/employees/refresh");
      }
    },
  },
  async created() {
    await this.fetchData();
  },
};
</script>

<style scoped>
table {
  text-align: left;
}

td {
  padding: 10px;
}
#duo {
  display: flex;
  gap: 15px;
}
.warning {
  font-size: 16px;
  color: red;
  cursor: pointer;
}
</style>