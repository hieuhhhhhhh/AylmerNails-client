<template>
  <div id="app">
    <DrawerNav />
    <Header />
    <ApiContinueSession />
    <div id="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/view-shell/Header.vue";
import Footer from "./components/view-shell/footer/Footer.vue";
import DrawerNav from "./components/view-shell/drawer-navigation/Parent.vue";
import ApiContinueSession from "./components/view-shell/ApiContinueSession.vue";

export default {
  components: { Header, Footer, DrawerNav, ApiContinueSession },
  created() {
    document.title = "Aylmer Nails & Spa";
  },
};
</script>

<style src="./global.css"></style>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
