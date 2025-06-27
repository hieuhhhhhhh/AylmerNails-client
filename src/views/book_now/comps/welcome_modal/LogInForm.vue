<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label>
        Phone Number
        <input type="tel" v-model="phoneNum" required />
      </label>
    </div>
    <div>
      <label>
        Password
        <input type="text" v-model="password" required />
      </label>
    </div>
    <label>
      <input id="check" type="checkbox" v-model="rememberMe" />
      Remember me next time
    </label>

    <div>{{ msg }}</div>
    <button>Log in</button>
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
