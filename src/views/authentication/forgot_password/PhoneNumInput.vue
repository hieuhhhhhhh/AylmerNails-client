<template>
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
      <input
        type="password"
        v-model="password"
        placeholder="New Password"
        required
      />
    </div>
    <div id="msg">{{ msg }}</div>
    <button class="greenBtn">Renew Password</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
// apis
import requestForgotPW from "../apis/requestForgotPW";

// PROPS
const props = defineProps({
  onNext: Function,
});

// PAYLOAD
const phoneNum = ref("");
const password = ref("");

// OUTPUT
const msg = ref("");

// APIS
async function onSubmit() {
  const { codeId, message, waitTime } = await requestForgotPW(phoneNum.value);

  //   if fail
  if (!codeId) {
    msg.value = message;
    return;
  }

  // if succesful
  props.onNext(codeId, phoneNum.value, password.value, waitTime);
}
</script>


<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
button {
  font-size: 20px;
  padding-inline: 50px;
  border-radius: 20px;
  margin-bottom: 50px;
}

input {
  padding: 6px 10px;
  width: 280px;
}

#msg {
  color: red;
  font-size: 15px;
}
</style>