<template>
  <div id="relative">
    <div id="content">
      <div id="slogan">Where Beauty Begins at Your Fingertips</div>
      <div>
        <button class="orangeBtn" @click="toBookNow">Book Now</button>
      </div>
    </div>

    <img :src="images[index]" alt="Logo" @load="onImgLoad" :style="imgstyle" />
  </div>
</template>

<script setup>
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";
import img4 from "@/assets/4.jpg";
import img5 from "@/assets/5.jpg";
import img6 from "@/assets/6.jpg";
import img7 from "@/assets/7.jpg";
import img8 from "@/assets/8.jpg";
import img9 from "@/assets/9.jpg";
import img10 from "@/assets/10.jpg";
import img11 from "@/assets/11.jpg";

import { useRouter } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";

// CONSTANTS
const router = useRouter();
const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
];

const styles = [
  "object-position: 100% 25%;",
  "object-position: 80% 50%;",
  "object-position: 30% 30%;",
  "object-position: 0% 32%;",
  "object-position: 0% 50%;",
  "object-position: 60% 73%;",
  "object-position: 60% 40%;",
  "object-position: 100% 45%;",
  "object-position: 50% 50%;",
  "object-position: 50% 45%;",
  "object-position: 50% 50%;",
];

// RESOURCES
const index = ref(Math.floor(Math.random() * 11));
// const index = ref(5);
const imgstyle = ref("");

// INPUT
function toBookNow() {
  router.push("/booknow");
}

// LIFECYCLE
let intervalId = null;
onMounted(() => {
  intervalId = setInterval(() => {
    index.value++;
    if (index.value > 10) {
      index.value = 0;
    }
  }, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

function onImgLoad() {
  imgstyle.value = styles[index.value];
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
  /* object-position: 100% 25%; */
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
  background-color: rgba(250, 166, 31, 0.75);
}
@media (orientation: portrait) {
  #slogan {
    font-size: 25px;
  }
}
</style>