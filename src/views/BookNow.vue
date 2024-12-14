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
    fetch("http://127.0.0.1:5000/api/service1")
      .then((response) => response.json())
      .then((data) => {
        this.msg = data.message;
      });
  },
};
</script>
