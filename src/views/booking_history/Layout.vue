<template>
  <div id="layout">
    <div id="title">Client Bookings</div>
    <BookingHistory />
  </div>
</template>

<script>
import BookingHistory from "./BookingHistory.vue";

export default {
  name: "Layout-",
  components: {
    BookingHistory,
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