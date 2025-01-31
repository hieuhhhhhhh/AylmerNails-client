<template>
  <div id="layout">
    <router-view />
  </div>
</template>


<script>
export default {
  name: "BookNowLayout",
  data() {
    return {
      // resources
      serviceIds: new Set(),
      // products
      date: null,
      services: {},
    };
  },
  methods: {
    onInputServiceIds(value) {
      this.serviceIds = value;
      console.log(this.serviceIds);
    },
    getServiceIds() {
      return this.serviceIds;
    },
    onCommitServices(services) {
      this.services = services;
    },
  },
  provide() {
    return {
      onInputServiceIds: this.onInputServiceIds,
      getServiceIds: this.getServiceIds,
      onCommitServices: this.onCommitServices,
    };
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