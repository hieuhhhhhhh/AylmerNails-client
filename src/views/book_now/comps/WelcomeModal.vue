<template>
  <div v-if="isLoggedOut">
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
    <button>Book without logging in</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
// pinia
import { useMyProfile } from "@/stores/myProfile";

// STATUS
const isLoggedOut = computed(() => {
  const noToken = MPstore.token === null;
  const isFetched = MPstore.isFetched;
  return noToken && isFetched;
});

// RESOURCES
const MPstore = useMyProfile();

// DEPENDENCIES
</script>

<script>
export default {};
</script>
