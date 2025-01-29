<template>
  <h1>Welcome to BookNow!</h1>
  <router-view />
</template>


<script>
export default {
  name: "BookNowLayout",
  data() {
    return {
      date: null,
      services: [],
    };
  },
};
</script>
