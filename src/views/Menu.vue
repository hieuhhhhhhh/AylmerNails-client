<template>
  <h1>Welcome to Menu!</h1>
  <div>message from server: {{ msg }}</div>
</template>

<script>
export default {
  name: "Menu-",
  data() {
    return {
      msg: "",
    };
  },
  created() {
    // fetch app path from env
    const baseURL = process.env.VUE_APP_BASE_URL;

    // connect server
    fetch(`${baseURL}/api`)
      .then((response) => response.json())
      .then((data) => {
        this.msg = data.message;
      });
  },
};
</script>
