// a log in window allow user to input phone num and password with a submit button
<template>
  <div id="app">
    <h1>Welcome to Log In!</h1>
    <form @submit.prevent="onSubmit">
      <PhoneNumInput v-model:phone="phone" />

      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <ApiSubmit ref="ApiSubmit" :phone="phone" :password="password" />

      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
import ApiSubmit from "./apis/ApiSubmit.vue";
import PhoneNumInput from "./comps/PhoneNumInput.vue";

export default {
  components: { ApiSubmit, PhoneNumInput },
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      // Call printToConsole method of ApiSubmit component via ref
      this.$refs.ApiSubmit.submitCredentials();
    },
  },
};
</script>
