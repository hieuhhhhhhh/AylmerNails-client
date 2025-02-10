<template>
  <div id="layout">
    <div v-show="page == 1">
      <Services
        :getServices="getServices"
        :onNavigateNext="navigateSelectTime"
      />
    </div>
    <div v-if="page == 2">
      <SelectTime :services="services" :onSelectChain="onSelectChain" />
    </div>
    <div v-if="page == 3">
      <FinalPreview :chain="chain" :date="date" />
    </div>
  </div>
</template>

<script>
// comps
import Services from "./comps/Services.vue";
import SelectTime from "./comps/SelectTime.vue";
import FinalPreview from "./comps/FinalPreview.vue";

export default {
  name: "BookNowParent",
  components: {
    Services,
    SelectTime,
    FinalPreview,
  },
  data() {
    return {
      // resources
      services: {},
      // status
      page: 1,
      // payload
      chain: {},
      date: null,
    };
  },
  methods: {
    getServices() {
      return this.services;
    },
    navigateSelectTime() {
      this.page++;
      console.log(this.services);
    },
    onSelectChain(chain, date) {
      console.log("date", date);
      this.date = date;
      this.chain = chain;
      this.page++;
    },
  },
};
</script>

<style scoped>
#layout {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100vw;
  margin-inline: auto;
  flex-grow: 1;
  box-sizing: border-box;
}
</style>