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
  mounted() {
    fetch("http://127.0.0.1:5000/api")
      .then((response) => response.json())
      .then((data) => {
        this.msg = data.message;
      });
  },
};
</script>
