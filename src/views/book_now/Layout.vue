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
      services: [],
    };
  },
  methods: {
    onInputServices(value) {
      this.serviceIds = value;
      console.log(this.serviceIds);
    },
  },
  provide() {
    return {
      onInputServices: this.onInputServices,
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