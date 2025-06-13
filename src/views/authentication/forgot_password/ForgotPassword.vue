<template>
  <div v-if="page === 1"><PhoneNumInput :onNext="onRequestCode" /></div>
  <div v-if="page === 2">
    <OTPverify :codeId="codeId" :phoneNum="phoneNum" :password="password" />
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
