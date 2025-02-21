<template>
  <button @click="handleClose">Close</button>
  <form @submit.prevent="onSubmit">
    <div v-for="(question, index) in questions" :key="index">
      {{ index + 1 }}. {{ question.questionText }}
      <div v-for="(option, childIndex) in question.options" :key="childIndex">
        <label>
          <input
            type="radio"
            :value="option.optionId"
            v-model="answers[question.questionId]"
            required
          />
          {{ option.optionText }} {{ formatOffset(option.optionOffset) }}
        </label>
      </div>
    </div>
    <div v-if="msg">{{ msg }}</div>

    <button>Submit</button>
  </form>
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
      msg: "",
      // outcome
      answers: {},
    };
  },
  methods: {
    onSubmit() {
      const AOSOs = [];
      for (let key in this.answers) {
        AOSOs.push(Number(key));
        AOSOs.push(this.answers[key]);
      }
      if (AOSOs.length / 2 !== this.questions.length) {
        this.msg = "Please provide answer to all questions";
        return;
      }
      this.onInputAOSOs(AOSOs);
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
    onInputAnswer() {},
  },
  async created() {
    this.questions = await fetchAOSs(this.serviceId);
  },
};
</script>
