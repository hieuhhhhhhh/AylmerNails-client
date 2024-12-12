<template>
  <div id="main">
    <div id="title">Aylmer Nails & Spa</div>
  </div>
</template>
<script>
export default {
  name: "Header-",
};
</script>

<style scoped>
#main {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px var(--shadow-color);
  background: var(--middleground);
  height: 60px;
}
#title {
  font-size: 25px;
  padding-inline: 60px;
}
</style>
