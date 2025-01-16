// a log in page allow user to input phone num and password with a submit button

<template>
  <div id="app">
    <h1>Welcome to Log In!</h1>
    <form @submit.prevent="onSubmit">
      <!-- prompt user phone number -->
      <PhoneNumInput v-model:phone="phone" />

      <!-- prompt user password -->
      <PasswordInput v-model:password="password" />

      <!-- take phone num an password and call api -->
      <LoginSubmitter
        ref="LoginSubmitter"
        :phone="phone"
        :password="password"
      />

      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
import LoginSubmitter from "./apis/LoginSubmitter.vue";
import PhoneNumInput from "./comps/PhoneNumInput.vue";
import PasswordInput from "./comps/PasswordInput.vue";

export default {
  components: { LoginSubmitter, PhoneNumInput, PasswordInput },
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      // Call printToConsole method of LoginSubmitter component via ref
      this.$refs.LoginSubmitter.submitCredentials();
    },
  },
};
</script>
