<template>
  <div id="title">
    Please enter the one time code sent to {{ phoneNum }} by text
  </div>
  <form @submit.prevent="onSubmit">
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
// apis
import guestAddAppo from "../../../apis/guestAddAppo";
import requestOTP from "../../../apis/requestOTP";

// PARAMS
const props = defineProps({
  codeId: Number,
  phoneNum: String,
  chain: Object,
  date: Number,
  onNavigateNext: Function,
  waitTime: Number,
});

// RESOURCES
const wait = ref(props.waitTime);

// PAYLOAD
const codeId = ref(props.codeId);
const code = ref("");
const msg = ref("");

// APIS
async function onSubmit() {
  const { ok, message } = await guestAddAppo(
    codeId.value,
    code.value,
    props.chain,
    props.date
  );

  //   if fail
  if (!ok) {
    msg.value = message;
    code.value = "";
    return;
  }

  // if succesful
  props.onNavigateNext();
}

async function onResend() {
  const {
    codeId: _codeId,
    message,
    waitTime,
  } = await requestOTP(props.phoneNum);

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
#title {
  margin: 20px 0px;
  font-size: 17px;
}
button {
  padding: 8px 50px;
  border-radius: 20px;
  margin-bottom: 50px;
}
input[type="text"] {
  padding: 6px 10px;
  width: 250px;
}
form {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: column;
  padding: 10px;
}

#msg {
  color: red;
  font-size: 15px;
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
</style>