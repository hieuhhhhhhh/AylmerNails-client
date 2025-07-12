<template>
  <div id="title">Please leave your phone number to confirm appointment</div>
  <form @submit.prevent="onSubmit">
    <div>
      <input
        type="tel"
        v-model="phoneNum"
        placeholder="Phone Number"
        required
      />
    </div>
    <div>
      <input type="text" v-model="name" placeholder="Name" required />
    </div>
    <div id="msg">{{ msg }}</div>
    <button class="blueBtn">Send Verification Code</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
// apis
import requestOTP from "../../../apis/requestOTP";

// PROPS
const props = defineProps({
  onNext: Function,
});

// PAYLOAD
const phoneNum = ref("");
const name = ref("");

// OUTPUT
const msg = ref("");

// APIS
async function onSubmit() {
  const { codeId, message, waitTime } = await requestOTP(phoneNum.value);

  //   if fail
  if (!codeId) {
    msg.value = message;
    return;
  }

  // if succesful
  props.onNext(codeId, phoneNum.value, name.value, waitTime);
}
</script>


<style scoped>
#title {
  margin: 20px 0px;
  font-size: 20px;
}
button {
  padding: 8px 20px;
  border-radius: 20px;
}
input {
  padding: 6px 10px;
  width: 250px;
}
form {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  padding: 10px;
}

#msg {
  color: red;
  font-size: 15px;
}
</style>