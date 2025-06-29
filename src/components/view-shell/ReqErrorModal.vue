<template>
  <div v-if="REstore.msg" id="parent">
    <div id="background" />

    <div id="window">
      <button @click="onClose" id="closeBtn" class="redBtn">X</button>
      <div id="content">
        <div id="title">Request Failure</div>
        {{ REstore.msg }}
      </div>
    </div>
  </div>
</template>

<script setup>
// pinia
import { useRequestError } from "@/stores/myProfile";

// resources
const REstore = useRequestError();

// INPUT
function onClose() {
  REstore.reset();
}
</script>

<script>
export default {};
</script>


<style scoped>
#parent {
  z-index: 100;
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
  width: 300px;
  min-height: 100px;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
}
#content {
  padding: 10px 20px;
  text-align: center;
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
#title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
