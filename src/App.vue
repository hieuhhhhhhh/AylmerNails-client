<template>
  <div id="app">
    <div><router-link to="/">Home</router-link></div>
    <div><router-link to="/about">About</router-link></div>
    <div><router-link to="/contact">Contact</router-link></div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style src="./GlobalStyle.css"></style>
