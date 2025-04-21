<template>
  <div id="flexBox">
    <div id="note">Step 4: review your submission</div>
    <div id="date">
      {{ unixToReadable(date) }} ~ {{ unixTimeToReminder(date) }}
    </div>
    {{ chain }}
    <div class="slot" v-for="(slot, index) in chain.slots" :key="index">
      <div>{{ slot.serviceName }}</div>
      <div>
        <FontAwesomeIcon :icon="faClock" />
        {{ secsToHours(slot.start) }} to {{ secsToHours(slot.end) }}
      </div>
    </div>
  </div>
  <div id="duo">
    <button class="orangeBtn" id="leftBtn" @click="onBack">
      <FontAwesomeIcon :icon="backIcon" /> Back
    </button>
    <button class="greenBtn" id="rightBtn" @click="onSubmit">
      Finish <FontAwesomeIcon :icon="continueIcon" />
    </button>
  </div>
</template>

<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faLeftLong,
  faCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
// lib
import unixToReadable from "@/lib/unixToReadable";
import unixTimeToReminder from "@/lib/unixTimeToReminder";
import secsToHours from "@/lib/secsToHours";

// apis
import submitAppoChain from "../../apis/submitAppoChain";

export default {
  name: "FinalPreview",
  props: {
    chain: Object,
    date: Number,
    onReturn: Function,
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      backIcon: faLeftLong,
      continueIcon: faCheck,
      faClock,
    };
  },
  methods: {
    onBack() {
      this.onReturn();
    },
    async onSubmit() {
      const res = await submitAppoChain(this.chain, this.date);
      console.log(res);
    },
    unixToReadable,
    unixTimeToReminder,
    secsToHours,
  },
};
</script>
<style scoped>
#duo {
  margin-top: 15px;
  display: flex;
  gap: 5px;
  width: 90%;
  justify-content: flex-end;
}

#rightBtn {
  padding: 10px;
  font-size: 25px;
}
#leftBtn {
  font-size: 23px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
#note {
  padding: 10px;
  padding-top: 0px;
  color: rgb(184, 121, 3);
}
#flexBox {
  display: flex;
  align-items: center;
  flex-direction: column;
}
#date {
  font-size: 23px;
}
.slot {
  box-shadow: 0 0 5px var(--shadow-color);
  background-color: var(--background-i2);
  padding: 10px;
  margin: 3px;
  width: 400px;
  max-width: 90%;
  border-radius: 5px;
}
</style>