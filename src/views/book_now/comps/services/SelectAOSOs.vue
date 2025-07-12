<template>
  <div id="parent">
    <div id="background" @click="handleClose" />
    <div id="window">
      <button @click="handleClose" id="closeBtn" class="redBtn">
        <FontAwesomeIcon :icon="faXmark" />
      </button>

      <div v-if="fetched">
        <div id="title">
          {{ serviceInfo.name }}
          <div id="description">
            {{ serviceInfo.description }}
          </div>
        </div>
        <form
          v-if="serviceInfo.client_can_book"
          @submit.prevent="onSubmit"
          id="content"
        >
          <div
            v-for="(question, index) in questions"
            :key="index"
            class="questionBox"
          >
            <span class="question"
              >{{ index + 1 }}. {{ question.questionText }}</span
            >
            <div class="optionBox">
              <div
                v-for="(option, childIndex) in question.options"
                :key="childIndex"
                class="options"
              >
                <label>
                  <input
                    type="radio"
                    :value="option.optionId"
                    v-model="answers[question.questionId]"
                    required
                  />
                  {{ option.optionText }}
                  {{ formatOffset(option.optionOffset) }}
                </label>
              </div>
            </div>
          </div>
          <div v-if="msg" id="msg">{{ msg }}</div>
          <div id="btnBox">
            <button id="confirm" class="blueBtn">Confirm</button>
          </div>
        </form>
        <div v-else id="notAvail">
          This service is not available for online booking, please contact us to
          book
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// apis
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
      faXmark,
      questions: [],
      serviceInfo: {},
      msg: "",
      // outcome
      answers: {},
      // status
      fetched: false,
    };
  },
  components: {
    FontAwesomeIcon,
  },
  methods: {
    onSubmit() {
      const AOSOs = [];
      for (let key in this.answers) {
        AOSOs.push(Number(key));
        AOSOs.push(this.answers[key]);
      }
      if (AOSOs.length / 2 !== this.questions.length) {
        this.msg = "Please provide answers to all questions";
        return;
      }
      this.onInputAOSOs(AOSOs);
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
    onInputAnswer() {},
  },
  async created() {
    // fetch data
    const { questions, serviceInfo } = await fetchAOSs(this.serviceId);
    this.questions = questions;
    this.serviceInfo = serviceInfo;
    this.fetched = true;
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
  max-width: 90%;
  background-color: var(--background-i1);
  overflow-y: auto;
  max-height: 80%;
}
#content {
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
#closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  aspect-ratio: 1;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 0px;
  font-size: 20px;
}
#btnBox {
  display: flex;
  justify-content: center;
}
#msg {
  text-align: center;
  font-size: 14px;
  color: red;
}
.question {
  font-size: 16px;
}
.questionBox {
  margin-bottom: 20px;
}
.optionBox {
  display: flex;
  justify-content: space-around;
  gap: 5px;
}

input[type="radio"] {
  position: relative;
  top: -1px;
  margin-left: -5px;
  margin-right: 5px;
  cursor: pointer;
}

label {
  font-size: 14px;
  background: var(--background-i2);
  box-shadow: 0 0 5px var(--shadow-color);
  border-radius: 3px;
  margin: 5px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
label:active {
  background: var(--active);
}
#title {
  text-align: center;
  font-size: 25px;
  margin-top: 10px;
}
#description {
  font-size: 15px;
  color: gray;
}
#confirm {
  padding: 5px 30px;
  border-radius: 20px;
}
#notAvail {
  padding: 20px;
  text-align: center;
  font-size: 15px;
  color: rgb(184, 121, 3);
}
</style>
