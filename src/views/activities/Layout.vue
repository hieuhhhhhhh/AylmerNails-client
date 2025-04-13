<template>
  <div id="layout">
    <div id="bar">
      <router-link
        to="/activities/booking"
        class="btn"
        :class="{ selected: $route.path === '/activities/booking' }"
      >
        Booking
      </router-link>
      <router-link
        to="/activities/canceled"
        class="btn"
        :class="{ selected: $route.path === '/activities/canceled' }"
      >
        Canceled
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Nothing needed here for now
</script>

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

.btn {
  border: 1px solid rgba(128, 128, 128, 0.6);
  font-size: 14px;
  padding: 5px 15px;
  border-radius: 15px;
  background: var(--background-i2);
  color: var(--foreground);
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}
.btn.selected {
  color: var(--background-i0);
  background: var(--foreground);
}
.btn:active {
  background: gray;
}
</style>
