<template>
  <div id="layout">
    <Services :getServices="getServices" :onNavigateNext="navigateSelectTime" />
  </div>
</template>

<script>
// comps
import Services from "./comps/Services.vue";

export default {
  name: "BookNowParent",
  components: {
    Services,
  },
  data() {
    return {
      services: {},
    };
  },
  methods: {
    getServices() {
      return this.services;
    },
    navigateSelectTime() {
      console.log(this.services);
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