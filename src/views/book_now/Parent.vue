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
  </div>
</template>

<script>
// comps
import Services from "./comps/Services.vue";
import SelectTime from "./comps/SelectTime.vue";

export default {
  name: "BookNowParent",
  components: {
    Services,
    SelectTime,
  },
  data() {
    return {
      // resources
      services: {},
      // status
      page: 1,
      // payload
      chain: {},
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
    onSelectChain(chain) {
      this.chain = chain;
      console.log("chain", JSON.stringify(this.chain));
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