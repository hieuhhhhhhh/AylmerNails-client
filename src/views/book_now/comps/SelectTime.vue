<template>
  <div>
    <input id="date" type="date" :value="date" @change="onInputDate" />
  </div>

  <div v-for="(opening, index) in sortedOpenings" :key="index">
    <button @click="onChooseOpening(opening)">select opening</button>
    <div>{{ formatTime(opening.start) }}</div>
  </div>
  <div v-if="msg">{{ msg }}</div>
  <div id="duo">
    <button class="orangeBtn" id="leftBtn" @click="onBack">
      <FontAwesomeIcon :icon="backIcon" /> Back
    </button>
    <button class="blueBtn" id="rightBtn" @click="onContinue">
      Next <FontAwesomeIcon :icon="continueIcon" />
    </button>
  </div>
</template>
<script>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
// lib
import getTodayUnixTime from "@/lib/getTodayUnixTime";
import fetchAvailability from "../apis/fetchAvailability";
import secondsToClock from "../apis/secondsToClock";
import parseDate from "@/lib/parseDate";

export default {
  props: {
    services: Object,
    onSelectChain: Function,
    onReturn: Function,
  },

  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      // icons
      backIcon: faLeftLong,
      continueIcon: faRightLong,
      // resources
      msg: "",
      chains: [],
      openings: {},
      sortedOpenings: [],
      date: null,
      // outcome
      chain: null,
      unixDate: null,
    };
  },
  methods: {
    onBack() {
      this.onReturn();
    },
    onContinue() {
      if (!this.unixDate) {
        this.msg = "Please select a date!";
        return;
      }
      if (!this.chain) {
        this.msg = "Please select a time stamp for your appointment!";
        return;
      }
      this.onSelectChain(this.chain, this.unixDate);
    },
    formatTime(seconds) {
      return secondsToClock(seconds);
    },
    onChooseOpening(opening) {
      // reset state
      this.msg = "";
      this.chain = null;
      // choose a random chain
      const max = opening.chains.length;
      const random = Math.floor(Math.random() * max);
      this.chain = opening.chains[random];
    },
    isInThePast(value) {
      const today = getTodayUnixTime();
      const validated = parseDate(value);
      const res = validated <= today - 24 * 60 * 60;
      return res;
    },
    resetData() {
      this.msg = "";
      this.chains = [];
      this.openings = {};
      this.sortedOpenings = [];
      this.date = null;
      this.chain = null;
      this.unixDate = null;
    },
    async onInputDate(event) {
      // reset data
      this.resetData();
      // read from event
      const value = event.target.value;
      // if user select day in the past do nothing
      if (this.isInThePast(value)) {
        this.msg = "Please select a valid date!";
        return;
      }

      this.date = value;
      this.unixDate = parseDate(value);
      console.log("unix date: ", this.unixDate);
      await this.fetchData();
    },
    async fetchData() {
      const res = await fetchAvailability(this.unixDate, this.services);
      if (res) this.chains = res;
      // append object 'openings'
      for (let chain of this.chains) {
        const start = chain.chainStart;
        const end = chain.chainEnd;
        const minEnd = chain.minEnd;

        // group chains to groups called 'openings'
        if (!this.openings[start] || this.openings[start].end > end) {
          const opening = {
            start: start,
            end: end,
            minEnd: minEnd,
            chains: [],
          };
          this.openings[start] = opening;
        }

        if (this.openings[start].end === end) {
          this.openings[start].chains.push(chain);
        }
      }

      // convert to array
      const newOpenings = Object.values(this.openings);
      this.sortedOpenings = newOpenings.sort((a, b) => a.start - b.start);
    },
  },
};
</script>
<style scoped>
#duo {
  display: flex;
  gap: 5px;
  width: 90%;
  justify-content: flex-end;
}

#rightBtn {
  padding: 10px;
  font-size: 25px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
#leftBtn {
  font-size: 23px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}
</style>