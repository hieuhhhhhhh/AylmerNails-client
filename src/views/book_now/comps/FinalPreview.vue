<template>
  <form @submit.prevent="onSubmit">
    <div>{{ chain }}</div>
    <button>Submit</button>
  </form>
</template>

<script>
import submitAppoChain from "../apis/submitAppoChain";

export default {
  props: {
    chain: Object,
    date: Number,
  },
  methods: {
    async onSubmit() {
      const res = await submitAppoChain(this.chain, this.date);
      console.log(res);
    },
  },
};
</script>
