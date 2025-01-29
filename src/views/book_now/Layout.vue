<template>
  <h1>Welcome to BookNow!</h1>
  <router-view @serviceIds="onInputServices" />
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
};
</script>
