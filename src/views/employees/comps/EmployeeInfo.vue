<template>
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
        <td>{{ intervals }}</td>
      </tr>
    </tbody>
  </table>
  <div id="note">*Intervals are not editable</div>
  <tr>
    <th>Services:</th>
  </tr>
  <button class="blueBtn" @click="openEditForm">
    <FontAwesomeIcon :icon="editIcon" /> Edit Employee Details
  </button>
</template>
<script>
// comps
import NA from "@/components/NotAvailable.vue";
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default {
  props: {
    inAlias: String,
    inIntervals: String,
    inLastDate: Number,
  },
  components: {
    NA,
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      editIcon: faPenToSquare,
      // states
      alias: "",
      intervals: "",
      last_date: null,
      ESs: [],
      schedules: [],
    };
  },
  async created() {
    this.alias = this.inAlias;
    this.intervals = this.inIntervals;
    this.last_date = this.inLastDate;
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