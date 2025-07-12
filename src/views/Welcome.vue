<template>
  <div id="relative">
    <div id="content">
      <div id="slogan">Where Beauty Begins at Your Fingertips</div>
      <div>
        <button class="orangeBtn" @click="toBookNow">Book Now</button>
      </div>
    </div>

    <div id="frame">
      <img
        :src="images[index]"
        :style="imgPosition"
        :class="styleClass"
        @load="onImgLoad"
      />
    </div>
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
import { ref } from "vue";

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
// const index = ref(0);
const imgPosition = ref(styles[index.value]);

// STATUS
const styleClass = ref("invisible");

// INPUT
function toBookNow() {
  router.push("/booknow");
}

// LIFECYCLE

function onImgLoad() {
  styleClass.value = "fade-loop";

  setTimeout(() => {
    styleClass.value = "invisible";
    index.value++;
    if (index.value > 10) {
      index.value = 0;
    }
    imgPosition.value = styles[index.value];
  }, 8000);
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
  filter: brightness(70%);
  animation: fadeIn 1.5s ease-in-out forwards;
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
#frame {
  overflow: hidden;
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
  background-color: rgba(250, 166, 31, 0.8);
}
@media (orientation: portrait) {
  #slogan {
    font-size: 25px;
  }
}

/* Looping fade animation */
.fade-loop {
  animation: fadeInOut 8s ease-in-out forwards;
}
.invisible {
  opacity: 0;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(1.15);
  }
}
</style>