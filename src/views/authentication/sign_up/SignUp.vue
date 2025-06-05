<template>
  <div v-if="page === 1"><Credentials :onNext="onRequestCode" /></div>
  <div v-if="page === 2">
    <OTPverify
      :codeId="codeId"
      :phoneNum="phoneNum"
      :password="password"
      :firstName="firstName"
      :lastName="lastName"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
// comps
import Credentials from "./Credentials.vue";
import OTPverify from "./OTPverify.vue";

// RESOURCES
const page = ref(1);
// PAYLOAD
const codeId = ref();
const phoneNum = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");

// HANDLERS
function onRequestCode(_codeId, _phoneNum, _password, _firstName, _lastName) {
  codeId.value = _codeId;
  phoneNum.value = _phoneNum;
  password.value = _password;
  firstName.value = _firstName;
  lastName.value = _lastName;

  // to next page
  page.value++;
}
</script>

<script>
export default {};
</script>
