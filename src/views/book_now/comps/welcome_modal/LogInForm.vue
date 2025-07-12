<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input
        type="tel"
        v-model="phoneNum"
        required
        placeholder="Phone Number"
      />
    </div>
    <div>
      <input
        type="password"
        v-model="password"
        required
        placeholder="Password"
      />
    </div>
    <label>
      <input id="check" type="checkbox" v-model="rememberMe" />
      Remember me next time
    </label>

    <div id="msg">{{ msg }}</div>
    <div>
      <button class="blueBtn">Log in</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
// apis
import logIn from "./apis/logIn";

// PROPS
const props = defineProps({
  closeModal: Function,
});

// RESOURCES
const msg = ref("");

// PAYLOAD
const phoneNum = ref("");
const password = ref("");
const rememberMe = ref(false);

// APIS
async function onSubmit() {
  const { message } = await logIn(
    phoneNum.value,
    password.value,
    rememberMe.value
  );
  // if failed
  if (message) {
    msg.value = message;
    return;
  }

  // if succeeded
  props.closeModal();
}
</script>



<script>
export default {};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

input[type="password"],
input[type="tel"] {
  padding: 6px 10px;
  width: 250px;
}

input[type="checkbox"] {
  transform: scale(1.5);
  margin-inline: 3px;
}

button {
  font-size: 15px;
  padding-inline: 50px;
  border-radius: 20px;
  margin-bottom: 20px;
}
label {
  font-size: 15px;
}
#msg {
  color: red;
  font-size: 15px;
}
</style>
