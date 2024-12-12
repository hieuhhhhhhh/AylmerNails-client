<template>
  <div id="app-container">
    <Header />
    <div id="main-content">
      <div><router-link to="/">Home</router-link></div>
      <div><router-link to="/about">About</router-link></div>
      <div><router-link to="/contact">Contact</router-link></div>

      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/view-shell/Header.vue";
import Footer from "./components/view-shell/Footer.vue";

export default {
  components: { Header, Footer },
  name: "App",
  created() {
    document.title = "Aylmer Nails & Spa";
  },
};
</script>

<style src="./global.css"></style>

<style scoped>
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#main-content {
  flex-grow: 1;
}
</style>
