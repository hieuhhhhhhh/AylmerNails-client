<template>
  <div id="Header">
    <div id="title">Aylmer Nails & Spa</div>
  </div>
</template>
<script>
export default {
  name: "Header-",
};
</script>

<style scoped>
#Header {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px var(--shadow-color);
  background: var(--middleground);
  padding: 17px;
}
#title {
  font-size: 26px;
  padding-inline: 60px;
}

@media (orientation: portrait) {
  #Header {
    padding: 19px;
  }
}

@media (max-width: 500px) {
  #title {
    font-size: 20px;
    padding-top: 3px;
    padding-bottom: 3px;
  }
}
</style>
