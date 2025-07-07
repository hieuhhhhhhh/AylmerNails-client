<template>
  <div id="parent">
    <div id="background" />

    <div id="window">
      <button @click="props.onClose()" id="closeBtn" class="redBtn">X</button>
      <div id="content">
        <div v-if="page === 1"><PhoneNumInput :onNext="onRequestCode" /></div>
        <div v-if="page === 2">
          <OTPverify
            :codeId="codeId"
            :phoneNum="phoneNum"
            :chain="props.chain"
            :date="props.date"
            :name="name"
            :onNavigateNext="onNavigateNext"
            :waitTime="waitTime"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// comps
import PhoneNumInput from "./PhoneNumInput.vue";
import OTPverify from "./OTPverify.vue";

// PARAMS
const props = defineProps({
  chain: Object,
  date: Number,
  onClose: Function,
  onNavigateNext: Function,
});
// RESOURCES
const page = ref(1);
const waitTime = ref(0);
// PAYLOAD
const codeId = ref();
const phoneNum = ref("");
const name = ref("");

// HANDLERS
function onRequestCode(_codeId, _phoneNum, _name, _waitTime) {
  codeId.value = _codeId;
  phoneNum.value = _phoneNum;
  waitTime.value = _waitTime;
  name.value = _name;
  // to next page
  page.value++;
}
</script>

<script>
export default {};
</script>

<style scoped>
#parent {
  z-index: 15;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#background {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
#window {
  position: relative;
  z-index: 20;
  width: 350px;
  min-height: 100px;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
}
#content {
  padding: 10px 20px;
  text-align: center;
}
#closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  aspect-ratio: 1;
  height: 30px;
  padding: 0;
  border-radius: 0;
  border: none;
}
</style>