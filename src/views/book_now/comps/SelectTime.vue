<template>
  <div>
    <input id="date" type="date" :value="date" @change="onInputDate" />
  </div>
  <div v-if="msg">{{ msg }}</div>
  <div v-for="(opening, index) in sortedOpenings" :key="index">
    <button @click="onChooseOpening(opening)">select opening</button>
    <div>{{ formatTime(opening.start) }}</div>
  </div>
</template>
<script>
// lib
import getTodayUnixTime from "@/lib/getTodayUnixTime";
import fetchAvailability from "../apis/fetchAvailability";
import secondsToClock from "../apis/secondsToClock";
import parseDate from "@/lib/parseDate";

export default {
  props: {
    services: Object,
    onSelectChain: Function,
  },
  data() {
    return {
      // resources
      msg: "",
      chains: [],
      openings: {},
      sortedOpenings: [],
      date: null,
      // outcome
      unixDate: null,
    };
  },
  methods: {
    formatTime(seconds) {
      return secondsToClock(seconds);
    },
    onChooseOpening(opening) {
      const max = opening.chains.length;
      const random = Math.floor(Math.random() * max);
      const randomChain = opening.chains[random];
      this.onSelectChain(randomChain, this.unixDate);
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
      this.unixDate = null;
    },
    async onInputDate(event) {
      // reset data
      this.resetData();
      // read from event
      const value = event.target.value;
      // if user select day in the past do nothing
      if (this.isInThePast(value)) {
        this.msg = "Please select a valid date.";
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
