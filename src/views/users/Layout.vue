<template>
  <div id="layout">
    <div id="bar">
      <button class="btn">Accounts</button>
      <button class="btn">Clients</button>
      <button class="selected btn">Blacklist</button>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Layout-",
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
#bar {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
button:active {
  background: gray;
}
</style>