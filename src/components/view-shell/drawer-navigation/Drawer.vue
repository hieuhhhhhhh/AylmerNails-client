<template>
  <div id="main">This is Menu</div>
</template>

<script>
export default {
  name: "Drawer-",
};
</script>

<style scoped>
#main {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  max-width: 75vw;
  height: 100%;
  background: var(--middleground);
  box-shadow: 0 0 5px var(--shadow-color);

  padding: 10px;
  padding-top: 60px;
}
</style>
