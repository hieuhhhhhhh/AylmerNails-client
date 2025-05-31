<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input type="text" v-model="code" placeholder="Enter Code" />
    </div>
    <div>{{ msg }}</div>
    <button>Verify</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import signUp from "../apis/signUp";

// params
const props = defineProps({
  codeId: Number,
  phoneNum: String,
  password: String,
});

// payload
const code = ref("");
const msg = ref("");
const router = useRouter();

// APIS
async function onSubmit() {
  const message = await signUp(
    props.codeId,
    code.value,
    props.phoneNum,
    props.password
  );

  //   if fail
  if (message) {
    msg.value = message;
    return;
  }

  // if succesful
  router.push("/");
}
</script>
