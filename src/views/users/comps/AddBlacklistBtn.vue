<template>
  <button id="unsave" class="redBtn" @click="onOpenModal">
    <FontAwesomeIcon :icon="faPlus" />
    Add to Blacklist
  </button>

  <div id="parent" v-if="isAdding">
    <div id="background" @click="onCloseModal" />
    <div id="window">
      <button @click="onCloseModal" id="closeBtn" class="redBtn">X</button>
      <div id="content">Adding</div>
      <div id="flexBox">
        <button class="redBtn" @click="onSubmit">Add to Blacklist</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ref } from "vue";
// apis

// status
const isAdding = ref(false);

// INPUT
function onCloseModal() {
  isAdding.value = false;
}

function onOpenModal() {
  isAdding.value = true;
}
</script>

<script>
export default {};
</script>

<style scoped>
#unsave {
  font-size: 13px;
}
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
