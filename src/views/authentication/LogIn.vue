<template>
  <div id="layout">
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
          placeholder="Password"
          required
        />
      </div>

      <label>
        <input id="check" type="checkbox" v-model="rememberMe" />
        Remember me next time
      </label>
      <div id="msg">{{ msg }}</div>

      <button class="blueBtn">Log in</button>
      <div>
        <router-link to="/forgot_password">Forgot Password</router-link>
      </div>
      <div>
        <router-link to="/signup">Create new Account</router-link>
      </div>
    </form>
  </div>
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

input[type="checkbox"] {
  transform: scale(1.5);
  margin: 10px;
  margin-inline: 3px;
}

input[type="password"],
input[type="tel"] {
  padding: 6px 10px;
  width: 250px;
}
label {
  font-size: 15px;
}
#msg {
  color: red;
  font-size: 15px;
}
</style>