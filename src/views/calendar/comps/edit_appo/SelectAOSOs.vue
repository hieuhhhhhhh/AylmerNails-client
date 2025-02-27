<template>
  <div id="parent">
    <div id="background" @click="handleClose" />
    <div id="window">
      <button @click="handleClose" id="closeBtn" class="redBtn">X</button>
      <form @submit.prevent="onSubmit" id="content">
        <div
          v-for="(question, index) in questions"
          :key="index"
          id="questionBox"
        >
          <span id="question"
            >{{ index + 1 }}. {{ question.questionText }}</span
          >
          <div
            v-for="(option, childIndex) in question.options"
            :key="childIndex"
          >
            <label>
              <input
                type="radio"
                :value="{
                  answerId: option.optionId,
                  answer: option.optionText,
                  offset: option.optionOffset,
                  question: question.questionText,
                }"
                v-model="answers[question.questionId]"
                required
              />
              {{ option.optionText }} {{ formatOffset(option.optionOffset) }}
            </label>
          </div>
        </div>
        <div v-if="msg" id="msg">{{ msg }}</div>
        <div id="btnBox"><button class="blueBtn">Submit</button></div>
      </form>
    </div>
  </div>
</template>
<script>
import fetchAOSs from "../../apis/fetchAOSs";

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
      const AOSOsText = [];

      for (let key in this.answers) {
        const questionId = Number(key);
        const { answerId, answer, question, offset } = this.answers[key];

        AOSOs.push(questionId);
        AOSOs.push(answerId);

        const text = { question, answer, offset };
        AOSOsText.push(text);
      }

      if (AOSOs.length / 2 !== this.questions.length) {
        this.msg = "Please provide answer to all questions";
        return;
      }

      this.onInputAOSOs(AOSOs, AOSOsText);
      this.onClose();
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
    console.log("questions", this.questions);
  },
};
</script>

<style scoped>
#parent {
  z-index: 15;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#background {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
#window {
  position: relative;
  z-index: 20;
  width: 500px;
  max-width: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
  max-height: 80%;
}
#content {
  padding: 20px;
  margin-top: 10px;
}
#closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  aspect-ratio: 1;
  height: 30px;
  padding: 0;
}
#btnBox {
  display: flex;
  justify-content: center;
}
#msg {
  text-align: center;
  color: red;
}
input[type="radio"] {
  transform: scale(1.5);
  margin: 7px;
}
#question {
  font-size: 20px;
}
#questionBox {
  margin-bottom: 15px;
}
</style>
