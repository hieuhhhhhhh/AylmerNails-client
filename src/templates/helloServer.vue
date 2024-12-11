<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => {
        this.message = data.message;
      });
  },
};
</script>
