<template>
  <div v-for="(opening, index) in sortedOpenings" :key="index">
    <div>{{ opening.start }}</div>
    <div>{{ opening.end }}</div>
    <div>{{ opening.minEnd }}</div>
    <div>{{ opening.chains.length }}</div>
  </div>

  <div>{{ chains.length }}</div>
</template>
<script>
import getTodayUnixTime from "@/lib/getTodayUnixTime";
// lib
import fetchAvailability from "../apis/fetchAvailability";
export default {
  props: {
    services: Object,
  },
  data() {
    return {
      // resources
      chains: [],
      openings: {},
      sortedOpenings: [],
    };
  },
  async created() {
    this.chains = await fetchAvailability(getTodayUnixTime(), this.services);

    // append object 'openings'
    for (let chain of this.chains) {
      const start = chain.chainStart;
      const end = chain.chainEnd;
      const minEnd = chain.minEnd;

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
