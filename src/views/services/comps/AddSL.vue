<template>
  <form @submit.prevent="onSubmit" id="asl">
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
      <button class="redBtn" @click.prevent="closeLengthInput">
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
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import SLEditTable from "./service_length_tables/SL-edit-table.vue";
import submitNewServiceLength from "../apis/submitSL";
import dateToUnixTime from "@/lib/parseDate";

export default {
  props: {
    serviceId: String,
  },
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
    async onSubmit() {
      const res = await submitNewServiceLength(
        this.serviceId,
        dateToUnixTime(this.date),
        this.variations,
        this.defaultLength
      );
      if (res) {
        this.$router.push("/services/refresh");
      }
    },
  },
};
</script>

<style scoped>
#asl {
  width: fit-content;
  padding: 7px;
  background-color: var(--background-i2);
}
#duo {
  display: flex;
  gap: 15px;
}
</style>