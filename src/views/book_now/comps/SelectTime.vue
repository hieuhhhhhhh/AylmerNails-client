<template>
  <div>
    <input id="date" type="date" :value="date" @change="onInputDate" />
  </div>

  <div v-for="(opening, index) in sortedOpenings" :key="index">
    <button @click="onChooseOpening(opening)">select opening</button>
    <div>{{ formatTime(opening.start) }}</div>
  </div>
</template>
<script>
import getTodayUnixTime from "@/lib/getTodayUnixTime";
// lib
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
      chains: [],
      openings: {},
      sortedOpenings: [],
      // outcome
      date: null,
      unixDate: getTodayUnixTime(),
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
    onInputDate(value) {
      this.date = value;
      this.unixDate = parseDate(value);
    },
  },
  async created() {
    this.chains = await fetchAvailability(this.date, this.services);
    console.log(this.chains);
    // append object 'openings'
    for (let chain of this.chains) {
      const start = chain.chainStart;
      const end = chain.chainEnd;
      const minEnd = chain.minEnd;

      // group chains to groups called 'openings'
      if (!this.openings[start] || this.openings[start].end > end) {
        const opening = { start: start, end: end, minEnd: minEnd, chains: [] };
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
};
</script>
