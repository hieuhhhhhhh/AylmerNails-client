<template>
  <div id="parent" v-if="isOpen && isLoggedOut">
    <div id="background" />
    <div id="window">
      <button @click.prevent="onClose" id="closeBtn" class="redBtn">
        <FontAwesomeIcon :icon="faXmark" />
      </button>

      <div id="content">
        <div id="title">Welcome to Online Booking!</div>
        <LogInForm :closeModal="onClose" />
        <router-link to="/forgot_password">Forgot Password</router-link>
        <router-link to="/signup">Create new Account</router-link>
        <button id="book" class="greenBtn" @click="onClose">
          Book without logging in
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { computed, ref } from "vue";
// pinia
import { useMyProfile } from "@/stores/myProfile";
// comps
import LogInForm from "./LogInForm.vue";

// STATUS
const isOpen = ref(true);
const isLoggedOut = computed(() => {
  const noToken = MPstore.token === null;
  const isFetched = MPstore.isFetched;
  return noToken && isFetched;
});

// RESOURCES
const MPstore = useMyProfile();

// HANDLERS
function onClose() {
  isOpen.value = false;
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
  max-width: 100%;
  max-height: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
}
#content {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  gap: 10px;
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
#title {
  margin-bottom: 10px;
  font-size: 20px;
}
#book {
  font-size: 15px;
  padding: 10px 50px;
  border-radius: 20px;
  margin: 10px;
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
</style>