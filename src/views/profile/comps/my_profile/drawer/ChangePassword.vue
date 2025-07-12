<template>
  <div id="parent">
    <div id="background" @click="onCancel" />
    <div id="window">
      <button @click="props.onCancel" id="closeBtn" class="redBtn">
        <FontAwesomeIcon :icon="faXmark" />
      </button>

      <form @submit.prevent="onSubmit">
        <div id="content">
          <input
            type="password"
            v-model="password"
            placeholder="Enter Current Password"
            required
          />
          <br />
          <input
            type="password"
            v-model="newPassword"
            placeholder="Enter New Password"
            required
          />
        </div>
        <div class="flexBox">
          <button class="blueBtn">Change Password</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// apis
import changePassword from "../../../apis/changePassword";

// PARAMS
const props = defineProps({
  onCancel: Function,
});

// PAYLOAD
const password = ref("");
const newPassword = ref("");

// INPUT
async function onSubmit() {
  const res = await changePassword(password.value, newPassword.value);
  if (res) props.onCancel();
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
  height: 100vh;
  width: 100vw;
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
  width: 300px;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
  max-height: 80%;
}
#content {
  padding: 20px;

  margin-top: 15px;
}
#closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  aspect-ratio: 1;
  height: 30px;
  padding: 0;
  border-radius: 0;
  font-size: 20px;
}
input {
  width: 100%;
  box-sizing: border-box;
}
table {
  text-align: left;
}
.flexBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
</style>
