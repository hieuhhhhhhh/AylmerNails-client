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
    <div>{{ msg }}</div>
    <button>Renew Password</button>
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
  const { codeId, message } = await requestForgotPW(phoneNum.value);

  //   if fail
  if (!codeId) {
    msg.value = message;
    return;
  }

  // if succesful
  props.onNext(codeId, phoneNum.value, password.value);
}
</script>


