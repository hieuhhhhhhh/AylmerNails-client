<template>
  <form @submit.prevent="onSubmit">
    <div v-if="isAddingLength">
      <SLEditTable
        :variations="variations"
        :addVariation="addVariation"
        :removeVariation="removeVariation"
        :editVariation="editVariation"
        :setDefaultLength="setDefaultLength"
        :defaultLength="defaultLength"
        :date="date"
        :setDate="setDate"
      />
    </div>
    <button v-if="!isAddingLength" class="blueBtn" @click="openLengthInput">
      <FontAwesomeIcon :icon="plusIcon" /> Add New Length Setting
    </button>
    <div v-else id="duo">
      <button class="redBtn" @click="closeLengthInput">
        <FontAwesomeIcon :icon="cancelIcon" /> Cancel
      </button>
      <button class="greenBtn" type="submit">
        <FontAwesomeIcon :icon="saveIcon" /> Add
      </button>
    </div>
  </form>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faCancel } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons
import SLEditTable from "./service_length_tables/SL-edit-table.vue";

export default {
  components: {
    FontAwesomeIcon,
    SLEditTable,
  },
  data() {
    return {
      // icons
      plusIcon: faPlus,
      cancelIcon: faCancel,
      saveIcon: faCheck,

      // status
      isAddingLength: false,

      // states
      date: null,
      variations: [],
      defaultLength: null,
    };
  },
  methods: {
    openLengthInput() {
      this.isAddingLength = true;
    },
    closeLengthInput() {
      this.variations = [];
      this.defaultLength = null;
      this.isAddingLength = false;
      this.date = null;
    },
    addVariation() {
      // add an empty variation to the array
      this.variations.push({ employee_id: null, length: null });
    },
    removeVariation(index) {
      this.variations.splice(index, 1);
    },
    editVariation(index, key, value) {
      this.variations[index][key] = value;
    },
    setDefaultLength(value) {
      this.defaultLength = value;
    },
    setDate(value) {
      this.date = value;
    },
    onSubmit() {},
  },
};
</script>

<style scoped>
#duo {
  display: flex;
  gap: 15px;
}
</style>