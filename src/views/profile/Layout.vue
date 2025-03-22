<template>
  <div id="layout">
    <Profile />
  </div>
</template>

<script>
import Profile from "./Profile.vue";

export default {
  name: "Layout-",
  components: {
    Profile,
  },
};
</script>

<style scoped>
#layout {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100vw;
  margin-inline: auto;
  flex-grow: 1;
  box-sizing: border-box;
}
#title {
  font-size: 25px;
  padding: 10px;
}
</style>