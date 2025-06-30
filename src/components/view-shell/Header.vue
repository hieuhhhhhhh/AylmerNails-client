<template>
  <div id="header">
    <div id="title">
      <router-link to="/">Aylmer Nails & Spa</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header-",
};
</script>

<style scoped>
#header {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px var(--shadow-color);
  background: var(--background-i2);
  padding: 17px;
  z-index: 10;
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
a {
  text-decoration: none;
  color: inherit;
}
</style>
