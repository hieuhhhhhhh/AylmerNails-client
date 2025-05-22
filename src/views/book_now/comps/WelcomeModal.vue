<template>
  <div id="parent" v-if="isOpen && isLoggedOut">
    <div id="background" />
    <div id="window">
      <button @click.prevent="onClose" id="closeBtn" class="redBtn">X</button>

      <div id="content">
        <div>Welcome to Online Booking!</div>
        <label>
          Phone Number
          <input type="text" />
        </label>

        <label>
          Password
          <input type="text" />
        </label>

        <button>Log in</button>
        <button>Forgot password</button>
        <button>Create an account</button>
        <button @click="onClose">Book without logging in</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
// pinia
import { useMyProfile } from "@/stores/myProfile";

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
}
</style>