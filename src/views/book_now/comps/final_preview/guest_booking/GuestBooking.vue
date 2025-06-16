<template>
  <div id="parent">
    <div id="background" />
    <div id="window">
      <div v-if="page === 1"><PhoneNumInput :onNext="onRequestCode" /></div>
      <div v-if="page === 2">
        <OTPverify :codeId="codeId" :phoneNum="phoneNum" :password="password" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// comps
import PhoneNumInput from "./PhoneNumInput.vue";
import OTPverify from "./OTPverify.vue";

// RESOURCES
const page = ref(1);
// PAYLOAD
const codeId = ref();
const phoneNum = ref("");
const password = ref("");

// HANDLERS
function onRequestCode(_codeId, _phoneNum, _password) {
  codeId.value = _codeId;
  phoneNum.value = _phoneNum;
  password.value = _password;

  // to next page
  page.value++;
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
  min-height: 100px;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
}
</style>