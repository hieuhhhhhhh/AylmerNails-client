<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input
        type="text"
        v-model="firstName"
        placeholder="First Name"
        required
      />
    </div>
    <div>
      <input type="text" v-model="lastName" placeholder="Last Name" required />
    </div>
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
        minlength="6"
        required
      />
    </div>
    <div>{{ msg }}</div>
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
const firstName = ref("");
const lastName = ref("");

// OUTPUT
const msg = ref("");

// APIS
async function onSubmit() {
  const { codeId, message } = await requestSignUp(
    phoneNum.value,
    firstName.value,
    lastName.value
  );

  //   if fail
  if (!codeId) {
    msg.value = message;
    return;
  }

  // if succesful
  props.onNext(
    codeId,
    phoneNum.value,
    password.value,
    firstName.value,
    lastName.value
  );
}
</script>


<script>
export default { name: "Credentials-" };
</script>
