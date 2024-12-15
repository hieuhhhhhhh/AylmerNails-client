<template>
  <h1>Welcome to BookNow!</h1>
  <div>message from server: {{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
    };
  },
  mounted() {
    const baseURL = process.env.VUE_APP_BASE_URL;
    console.log("baseURL: ", baseURL);

    fetch(`${baseURL}/api/service1`)
      .then((response) => response.json())
      .then((data) => {
        this.msg = data.message;
      });
  },
};
</script>
