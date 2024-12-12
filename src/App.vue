<template>
  <div id="App">
    <DrawerNav />
    <Header />
    <div id="content">
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
#App {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#content {
  flex-grow: 1;
}
</style>
