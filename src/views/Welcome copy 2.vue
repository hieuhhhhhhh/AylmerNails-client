<template>
  <img :src="img" class="fade-in-out" />
</template>

<script setup>
import img from "@/assets/2.jpg";
</script>

<script>
export default {
  name: "Welcome-",
};
</script>

<style scoped>
img {
  width: 100%;
  height: calc(100vh - 60px);
  object-fit: cover;
}

/* Combined fade-in and fade-out effect */
.fade-in-out {
  animation: fadeInOut 5s ease-in-out forwards;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
