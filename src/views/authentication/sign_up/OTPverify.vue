<template>
  <form @submit.prevent="onSubmit">
    <div>Please enter the one time code sent to {{ phoneNum }} by text</div>
    <div>
      <input type="text" v-model="code" placeholder="Verification Code" />
    </div>
    <div id="msg">{{ msg }}</div>
    <button class="greenBtn">Verify</button>
    <a v-if="wait > 0" class="disabled"> Resend Code (Wait {{ wait }}s)</a>
    <a v-else @click="onResend"> Resend Code </a>
  </form>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
// apis
import signUp from "../apis/signUp";
import requestSignUp from "../apis/requestSignUp";

// params
const props = defineProps({
  codeId: Number,
  phoneNum: String,
  password: String,
  firstName: String,
  lastName: String,
  waitTime: Number,
});

// payload
const codeId = ref(props.codeId);
const code = ref("");
const msg = ref("");
const router = useRouter();
const wait = ref(props.waitTime);

// APIS
async function onSubmit() {
  const message = await signUp(
    codeId.value,
    code.value,
    props.phoneNum,
    props.password,
    props.firstName,
    props.lastName
  );

  //   if fail
  if (message) {
    msg.value = message;
    code.value = "";
    return;
  }

  // if succesful
  router.push("/");
}

async function onResend() {
  const {
    codeId: _codeId,
    message,
    waitTime,
  } = await requestSignUp(props.phoneNum, props.firstName, props.lastName);
  console.log(_codeId);

  //   if fail
  if (!_codeId) {
    msg.value = message;
    return;
  }

  codeId.value = _codeId;
  wait.value = waitTime;
}

// LIFECYCLE
let interval;

onMounted(() => {
  interval = setInterval(() => {
    wait.value--;
  }, 1000); // count down every 1 second
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
button {
  font-size: 20px;
  padding-inline: 50px;
  border-radius: 20px;
  margin-bottom: 50px;
}
input {
  padding: 6px 10px;
  width: 250px;
}
a {
  font-size: 15px;
  text-decoration: none;
  color: rgb(0, 153, 255);
  cursor: pointer;
}

a:hover,
a:active {
  text-decoration: underline;
}

.disabled {
  color: gray;
  pointer-events: none;
}
#msg {
  color: red;
  font-size: 15px;
}
</style>