<template>
  <button @click="handleClose">Close</button>
  <div>Additional Questions:</div>
  <div v-for="(question, index) in questions" :key="index">
    {{ index + 1 }}. {{ question.questionText }}
    <div v-for="(option, index) in question.options" :key="index">
      {{ option.optionText }} {{ formatOffset(option.optionOffset) }}
    </div>
  </div>
</template>
<script>
import fetchAOSs from "../apis/fetchAOSs";

export default {
  props: {
    serviceId: Number,
    onClose: Function,
    onInputAOSOs: Function,
  },
  data() {
    return {
      // resource
      questions: [],
      // outcome
      AOSOs: [],
    };
  },
  methods: {
    onSubmit() {
      this.onInputAOSOs(this.AOSOs);
    },
    handleClose() {
      this.onClose();
    },
    formatOffset(seconds) {
      if (seconds === 0) return;

      let sign = seconds >= 0 ? "+" : "-";
      let absMinutes = Math.abs(Math.floor(seconds / 60));

      return `(${sign}${absMinutes} mins)`;
    },
  },
  async created() {
    this.questions = await fetchAOSs(this.serviceId);
  },
};
</script>
