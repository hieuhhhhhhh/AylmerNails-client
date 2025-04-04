<template>
  <div id="layout">
    <div id="title">Canceled Appointments</div>
    <Canceled />
  </div>
</template>

<script>
import Canceled from "./Canceled.vue";

export default {
  name: "Layout-",
  components: {
    Canceled,
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