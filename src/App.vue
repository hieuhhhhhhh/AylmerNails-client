<template>
  <div id="app-container">
    <Header />
    <DrawerNav />
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
import DrawerNav from "./components/view-shell/drawer-navigation/Parent.vue";

export default {
  components: { Header, Footer, DrawerNav },
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
