<template>
  <table>
    <tbody>
      <tr>
        <th>Name:</th>
        <td>
          <input type="text" required />
        </td>
      </tr>

      <tr>
        <th>Category:</th>
        <td>
          <input type="text" required />
        </td>
      </tr>

      <tr>
        <th>
          Default Length:<br />
          (minutes)
        </th>
        <td>
          <input type="text" required />
        </td>
      </tr>
      <tr>
        <th>Description:</th>
        <td>
          <input type="text" required />
        </td>
      </tr>
      <tr>
        <th>Employees:</th>
        <td>
          <input type="text" required />
        </td>
      </tr>
    </tbody>
  </table>

  <button v-if="!isEditing" class="greenBtn">
    <FontAwesomeIcon :icon="plusIcon" /> Save New Service
  </button>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import fetchEmployees from "./apis/fetchEmployees";
export default {
  props: {
    serviceInfo: Object,
    isFetched: Boolean,
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      saveIcon: faCheck,
      employees: [],
    };
  },
  methods: {},
  async created() {
    this.employees = await fetchEmployees();
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

#duo {
  display: flex;
  gap: 15px;
}
</style>