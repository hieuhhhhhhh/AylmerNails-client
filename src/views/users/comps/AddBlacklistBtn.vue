<template>
  <button id="unsave" class="redBtn" @click="onOpenModal">
    <FontAwesomeIcon :icon="faPlus" />
    Add to Blacklist
  </button>

  <div id="parent" v-if="isAdding">
    <div id="background" @click="onCloseModal" />
    <form @submit.prevent="onSubmit" id="window">
      <button type="button" @click="onCloseModal" id="closeBtn" class="redBtn">
        X
      </button>
      <div id="content">
        <label>
          Phone Number
          <input
            type="tel"
            placeholder="Enter Phone Number"
            v-model="phoneNum"
            @input="onPhoneInput"
            required
          />
        </label>
      </div>
      <div id="flexBox">
        <button class="redBtn">Add to Blacklist</button>
      </div>
    </form>
  </div>
</template>

<script setup>
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ref } from "vue";
// apis
import banUnbanPhoneNum from "../apis/banUnbanPhoneNum";
import { useRouter } from "vue-router";

// lib
const router = useRouter();
// resources
const phoneNum = ref("");
// status
const isAdding = ref(false);

// INPUT
function onCloseModal() {
  isAdding.value = false;
}

function onPhoneInput(event) {
  // Get the raw phone number input value
  let rawPhone = event.target.value.replace(/\D/g, ""); // Remove non-digit characters

  // Format the phone number (XXX XXX XXXX)
  let formatted = "";

  if (rawPhone.length <= 3) {
    formatted = rawPhone;
  } else if (rawPhone.length <= 6) {
    formatted = `${rawPhone.slice(0, 3)} ${rawPhone.slice(3)}`;
  } else {
    formatted = `${rawPhone.slice(0, 3)} ${rawPhone.slice(
      3,
      6
    )} ${rawPhone.slice(6)}`;
  }

  phoneNum.value = formatted;
}

function onOpenModal() {
  isAdding.value = true;
}

// APIS
async function onSubmit() {
  const realPN = "+1" + phoneNum.value.replace(/\D/g, "");
  const res = await banUnbanPhoneNum(realPN, true);
  if (res) {
    router.push("/refresh");
  }
}
</script>

<script>
export default {};
</script>

<style scoped>
#unsave {
  font-size: 13px;
}
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
input {
  width: 100%;
  box-sizing: border-box;
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
#unsave {
  font-size: 13px;
}
#flexBox {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
</style>
