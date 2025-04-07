<template>
  <div id="layout">
    <div id="bar">
      <div class="clicked">Canceled</div>
      <div class="clicked">Users</div>
      <div class="navigate">Bookings</div>
    </div>
    <!-- <div id="bar">
      <div class="two">Bookings</div>
      <div class="one">Canceled</div>
      <div class="one">Users</div>
    </div> -->
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
}
.navigate {
  /* font-size: 20px; */
  /* background: var(--background-i2); */
  color: var(--background-i0);
  background: var(--foreground);
  padding: 4px;
  padding-inline: 12px;
  border-radius: 15px;
  font-size: 14px;
  border: 1px solid rgba(128, 128, 128, 0.6);
}
.clicked {
  border: 1px solid rgba(128, 128, 128, 0.6);
  /* color: gray; */
  font-size: 14px;
  padding: 4px;
  padding-inline: 12px;
  border-radius: 15px;
  background: var(--background-i2);
}
.two {
}
</style>