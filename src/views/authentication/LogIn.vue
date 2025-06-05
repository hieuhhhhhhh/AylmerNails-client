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
    <div>{{ msg }}</div>

    <button>Log in</button>
  </form>
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

// APIS
async function onSubmit() {
  const { message } = await logIn(phoneNum.value, password.value);
  if (message) {
    msg.value = message;
    return;
  }

  // if succesful
  router.push("/");
}
</script>



<script>
export default {};
</script>
