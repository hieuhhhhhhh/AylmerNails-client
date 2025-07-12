<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input
        type="text"
        v-model="firstName"
        placeholder="First Name"
        required
      />
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
    <div id="msg">{{ msg }}</div>
    <button class="greenBtn">Sign up</button>
    <div>
      <router-link to="/login">I already have an account</router-link>
    </div>
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
  const { codeId, message, waitTime } = await requestSignUp(
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
    lastName.value,
    waitTime
  );
}
</script>


<script>
export default { name: "Credentials-" };
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
a {
  font-size: 15px;
  text-decoration: none;
  color: rgb(0, 153, 255);
}

a:hover,
a:active {
  text-decoration: underline;
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

input[type="text"] {
  width: 123px;
  margin-inline: 5px;
  /* margin-bottom: 10px; */
}
#msg {
  color: red;
  font-size: 15px;
}
</style>