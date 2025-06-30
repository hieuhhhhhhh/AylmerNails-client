<template>
  <img :src="imge" alt="Logo" />
</template>

<script setup>
import imge from "@/assets/1.jpg";
</script>

<script>
export default { name: "Welcome-" };
</script>

<style scoped>
/* img {
  position: fixed;
  z-index: -1;
  width: 100vw;
  height: calc(100vh - 180px);
  top: 60px;
  object-fit: cover;
  object-position: 100% 25%;
} */
img {
  width: 100%;
  height: calc(100vh - 60px);

  object-fit: cover;
  object-position: 100% 25%;
}
</style>