<template>
  <div id="layout">
    <div v-show="page == 1">
      <Services
        :getServices="getServices"
        :onNavigateNext="navigateSelectTime"
        :resetPage2="resetPage2"
      />
    </div>
    <div v-show="page == 2" :key="page2trigger">
      <SelectTime
        :services="services"
        :onSelectChain="onSelectChain"
        :onReturn="onReturn"
      />
    </div>
    <div v-show="page == 3" :key="page3trigger">
      <FinalPreview :chain="chain" :date="date" :onReturn="onReturn" />
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
      page2trigger: 0,
      page3trigger: 0,
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
    resetPage2() {
      this.page2trigger++;
    },
    onReturn() {
      this.page--;
    },
    onSelectChain(chain, date) {
      console.log("date", date);
      this.date = date;
      this.chain = chain;
      this.page3trigger++;
      this.page++;
    },
  },
  beforeRouteLeave(to, from, next) {
    const answer = confirm("Your progress won't be saved. Proceed to leave?");
    if (answer) {
      next(); // Proceed with navigation
    } else {
      next(false); // Prevent navigation
    }
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
#xs {
  color: rgb(193, 0, 0);
}
</style>