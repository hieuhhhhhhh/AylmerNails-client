<template>
  <div id="relative">
    <div id="content">
      <div id="slogan">Where Beauty Begins at Your Fingertips</div>
      <div>
        <button class="orangeBtn" @click="toBookNow">Book Now</button>
      </div>
    </div>
    <img :src="img1" alt="Logo" />
  </div>
</template>

<script setup>
import img1 from "@/assets/1.jpg";
import { useRouter } from "vue-router";
// resources
const router = useRouter();

// INPUT
function toBookNow() {
  router.push("/booknow");
}
</script>

<script>
export default { name: "Welcome-" };
</script>

<style scoped>
img {
  width: 100%;
  height: calc(100vh - 60px);
  object-fit: cover;
  object-position: 100% 25%;
  display: block;
  filter: brightness(50%);
}
#content {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  text-align: center;
  flex-direction: column;
  color: white;
}
#relative {
  position: relative;
}
#slogan {
  /* font-weight: bold; */
  font-family: cursive;
  font-size: 30px;
  margin-top: 12vh;
  padding: 10px;

  /* font-family: "Brush Script MT"; */
  /* font-family: "Comic Sans MS"; */
  /* font-family: "Courier New", monospace; */
}
button {
  border-radius: 20px;
  padding: 10px 30px;
  font-size: 20px;
  background-color: rgba(250, 166, 31, 0.7);
}
@media (orientation: portrait) {
  #slogan {
    font-size: 25px;
  }
}
</style>