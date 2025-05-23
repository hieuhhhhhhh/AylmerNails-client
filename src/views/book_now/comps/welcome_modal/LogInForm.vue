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

    <button>Log in</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from "vue";
// apis
import logIn from "./apis/logIn";

// PROPS
const props = defineProps({
  closeModal: Function,
});

// PAYLOAD
const phoneNum = ref("");
const password = ref("");

// APIS
async function onSubmit() {
  const res = await logIn(phoneNum.value, password.value);
  if (res) {
    props.closeModal();
  }
}
</script>



<script>
export default {};
</script>
