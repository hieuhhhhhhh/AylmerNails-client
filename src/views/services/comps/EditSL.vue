<template>
  <form @submit.prevent="onSubmit" id="asl">
    <SLEditTable
      :variations="variations"
      :addVariation="addVariation"
      :removeVariation="removeVariation"
      :editVariation="editVariation"
      :setDefaultLength="setDefaultLength"
      :defaultLength="defaultLength"
      :date="effective_from"
    />

    <div id="duo">
      <button class="redBtn" @click.prevent="cancelEditing">
        <FontAwesomeIcon :icon="cancelIcon" /> Cancel
      </button>
      <button class="greenBtn" type="submit">
        <FontAwesomeIcon :icon="saveIcon" /> Save
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

export default {
  props: {
    serviceId: Number,
    inputVariations: Object,
    effective_from: Number,
    inputLength: Number,
    cancelEditing: Function,
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

      // products
      variations: [],
      defaultLength: null,
    };
  },
  methods: {
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

    async onSubmit() {
      console.log(
        this.serviceId,
        this.effective_from,
        this.variations,
        this.defaultLength
      );
      const res = await submitNewServiceLength(
        this.serviceId,
        this.effective_from,
        this.variations,
        this.defaultLength
      );

      if (res) {
        this.$router.push("/services/refresh");
      }
    },
  },
  created() {
    this.defaultLength = this.inputLength / 60;
    this.inputVariations.forEach((e) => {
      const { employee_id, length_offset } = e;
      this.variations.push({
        employee_id,
        length: (length_offset + this.inputLength) / 60,
      });
    });
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