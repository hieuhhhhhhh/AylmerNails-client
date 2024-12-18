<template>
  <h1>Welcome to MySQL!</h1>
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
    console.log("baseURL: ", process.env.VUE_APP_TEST);

    fetch(`${baseURL}/api/authentication/mysql`)
      .then((response) => response.json())
      .then((data) => {
        this.msg = data;
      });
  },
};
</script>
