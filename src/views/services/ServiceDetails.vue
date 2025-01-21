<template>
  <table>
    <tbody>
      <tr>
        <th>Name:</th>
        <td class="highlight">{{ details.name }}</td>
      </tr>
      <tr>
        <th>Description:</th>
        <td>{{ details.description }}</td>
      </tr>
      <tr>
        <th>Available Until:</th>
        <td>
          <NA v-if="!details.last_date?.formatDate() && isFetched" />
        </td>
      </tr>
      <tr>
        <th>Category:</th>
        <td><NA v-if="!details.cate_name && isFetched" /></td>
      </tr>
    </tbody>
  </table>
  <button class="blueBtn">
    <FontAwesomeIcon :icon="editIcon" /> Edit Service Details
  </button>

  <th>Current Length Setting:</th>

  <ServiceLengthTable
    v-if="currentLength && Object.keys(currentLength).length"
    :serviceLength="currentLength"
  />
  <td v-else-if="isFetched"><NA /></td>
  <br />
  <th>Future Length Settings:</th>
  <td v-if="!futureLengths.length > 0 && isFetched"><NA /></td>

  <ServiceLengthTable
    v-for="(serviceLength, index) in futureLengths"
    :key="index"
    :serviceLength="serviceLength"
  />

  <button class="blueBtn">
    <FontAwesomeIcon :icon="plusIcon" /> Add New Length Setting
  </button>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons

import fetchServiceDetails from "./apis/fetchServiceDetails";
import ServiceLengthTable from "./comps/ServiceLengthTable.vue";
import unixToReadable from "@/lib/unixToReadable";
import getTodayUnixTime from "@/lib/getTodayUnixTime";
import NA from "@/components/NotAvailable.vue";

export default {
  components: { ServiceLengthTable, NA, FontAwesomeIcon },
  data() {
    return {
      editIcon: faPenToSquare,
      plusIcon: faPlus,
      service_id: null,
      details: {},
      futureLengths: [],
      currentLength: {},
      isFetched: false,
    };
  },
  methods: {
    formatDate(unixTime) {
      return unixToReadable(unixTime);
    },
  },
  async created() {
    this.service_id = this.$route.params.id;
    this.details = await fetchServiceDetails(this.service_id);
    console.log(this.details);
    // fetch lengths
    this.lengths = this.details.lengths;
    console.log(this.lengths[0]);

    for (let i = 0; i < this.lengths.length; i++) {
      const effective_from = this.lengths[i].effective_from;
      const today = getTodayUnixTime();
      if (effective_from <= today) {
        this.currentLength = this.lengths[i];
      } else {
        this.futureLengths = this.lengths.slice(i);
        break;
      }
    }

    // set isFetched
    this.isFetched = true;
  },
};
</script>

<style scoped>
.highlight {
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}
th,
td {
  padding: 10px;
  text-align: left;
}
</style>
