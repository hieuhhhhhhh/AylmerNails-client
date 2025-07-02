<template>
  <div id="layout">
    <div v-if="page === 1"><Credentials :onNext="onRequestCode" /></div>
    <div v-if="page === 2">
      <OTPverify
        :codeId="codeId"
        :phoneNum="phoneNum"
        :password="password"
        :firstName="firstName"
        :lastName="lastName"
        :waitTime="waitTime"
      />
    </div>
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
const waitTime = ref(0);

// HANDLERS
function onRequestCode(
  _codeId,
  _phoneNum,
  _password,
  _firstName,
  _lastName,
  _waitTime
) {
  codeId.value = _codeId;
  phoneNum.value = _phoneNum;
  password.value = _password;
  firstName.value = _firstName;
  lastName.value = _lastName;
  waitTime.value = _waitTime;
  // to next page
  page.value++;
}
</script>

<script>
export default {};
</script>

<style scoped>
#layout {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100vw;
  margin-inline: auto;
  flex-grow: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>