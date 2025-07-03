<template>
  <div id="parent">
    <div id="background" @click="props.onCancel" />
    <div id="window">
      <button @click="props.onCancel" id="closeBtn" class="redBtn">X</button>

      <div id="content">
        <form @submit.prevent="onSubmit">
          <div>Log out your account in all devices?</div>
          <div id="flex">
            <button id="yes" class="blueBtn">Yes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
// apis
import logOutEverywhere from "../../../apis/logOutEverywhere";

// PARAMS
const props = defineProps({
  onCancel: Function,
});

// RESOURCES
const router = useRouter();

// INPUT
async function onSubmit() {
  await logOutEverywhere();
  router.push("/");
}
</script>


<script>
export default {};
</script>



<style scoped>
#parent {
  z-index: 15;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
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
  font-size: 20px;
  margin-top: 15px;
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
}

#flex {
  display: flex;
  justify-content: center;
}
#yes {
  margin-top: 10px;
  padding: 5px 15px;
}
</style>