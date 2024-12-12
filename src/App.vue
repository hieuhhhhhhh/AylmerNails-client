<template>
  <div id="app">
    <Header />
    <div><router-link to="/">Home</router-link></div>
    <div><router-link to="/about">About</router-link></div>
    <div><router-link to="/contact">Contact</router-link></div>

    <router-view />
  </div>
</template>

<script>
import Header from "./components/view-shell/Header.vue";
export default {
  components: { Header },
  name: "App",
  created() {
    document.title = "Aylmer Nails & Spa";
  },
};
</script>

<style src="./global.css"></style>
