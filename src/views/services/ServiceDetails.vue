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
        <td>{{ details.last_date?.formatDate() || "NA" }}</td>
      </tr>
      <tr>
        <th>Category:</th>
        <td>{{ details.cate_name ?? "NA" }}</td>
      </tr>
    </tbody>
  </table>

  <th>Future Lengths:</th>
  <ServiceLengthTable
    v-for="(serviceLength, index) in details.lengths"
    :key="index"
    :serviceLength="serviceLength"
  />
</template>

<script>
import fetchServiceDetails from "./apis/fetchServiceDetails";
import ServiceLengthTable from "./comps/ServiceLengthTable.vue";
import unixToReadable from "@/lib/unixToReadable";

export default {
  components: { ServiceLengthTable },
  data() {
    return {
      service_id: null,
      details: {},
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
  },
};
</script>

<style scoped>
.highlight {
  font-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
