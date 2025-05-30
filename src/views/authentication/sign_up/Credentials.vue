<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label>
        Phone Number
        <input type="tel" v-model="phoneNum" />
      </label>
    </div>
    <div>
      <label>
        Password
        <input type="text" v-model="password" />
      </label>
    </div>

    <button>Sign up</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
// apis
import requestSignUp from "../apis/requestSignUp";

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
  const { codeId, message } = await requestSignUp(phoneNum.value);

  //   if fail
  if (!codeId) {
    msg.value = message;
    return;
  }

  // if succesful
  props.onNext(codeId, phoneNum.value, password.value);
}
</script>


<script>
export default { name: "Credentials-" };
</script>
