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
        <input type="password" v-model="password" />
      </label>
    </div>

    <label>
      <input id="check" type="checkbox" v-model="rememberMe" />
      Remember me next time
    </label>
    <div>{{ msg }}</div>

    <button>Log in</button>
  </form>
  <div><router-link to="/forgot_password">Forgot Password</router-link></div>
</template>

<script setup>
import { ref } from "vue";
// apis
import logIn from "./apis/logIn";
import { useRouter } from "vue-router";

// RESOURCES
const router = useRouter();
// PAYLOAD
const phoneNum = ref("");
const password = ref("");
const msg = ref("");
const rememberMe = ref(false);

// APIS
async function onSubmit() {
  const { message } = await logIn(
    phoneNum.value,
    password.value,
    rememberMe.value
  );
  if (message) {
    msg.value = message;
    password.value = "";
    return;
  }

  // if succesful
  router.push("/");
}
</script>



<script>
export default {};
</script>
