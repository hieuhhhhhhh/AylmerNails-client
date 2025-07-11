<template>
  <button class="orangeBtn" id="unsave" @click="onOpenModal">
    <FontAwesomeIcon :icon="faBookmark" />
    Unsave All
  </button>

  <div id="parent" v-if="isUnsaving">
    <div id="background" @click="onCloseModal" />
    <div id="window">
      <button @click="onCloseModal" id="closeBtn" class="redBtn">
        <FontAwesomeIcon :icon="faXmark" />
      </button>
      <div id="content">Unsave All Appointments?</div>
      <div id="flexBox">
        <button class="redBtn" @click="onUnsave">Yes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// lib
import { useRouter } from "vue-router";
// apis
import unsaveAllAppos from "../apis/unsaveAllAppos";
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { ref } from "vue";

// lib
const router = useRouter();
// status
const isUnsaving = ref(false);

// INPUT
function onOpenModal() {
  isUnsaving.value = true;
}

function onCloseModal() {
  isUnsaving.value = false;
}

async function onUnsave() {
  const res = await unsaveAllAppos();
  if (res) {
    router.push("/refresh");
  }
}
</script>



<style scoped>
#parent {
  z-index: 15;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#background {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
#window {
  position: relative;
  z-index: 20;
  width: 300px;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
  max-height: 80%;
}
#content {
  padding: 20px;
  text-align: center;
  margin-top: 15px;
}
#closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  aspect-ratio: 1;
  height: 30px;
  padding: 0;
  border-radius: 0;
  border: none;
  font-size: 20px;
}
#unsave {
  font-size: 13px;
}
#flexBox {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>
