<template>
  <div>
    <h1>Welcome to the About page</h1>
  </div>
  <hello-server />
</template>

<script>
import helloServer from "./templates/helloServer.vue";
export default {
  components: { helloServer },
  created() {
    document.title = "About Us - My Vue App";
  },
};
</script>
