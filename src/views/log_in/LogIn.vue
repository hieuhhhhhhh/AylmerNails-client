<template>
  <div id="app">
    <h1>Welcome to Log In!</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          v-model="phone"
          @input="onPhoneInput"
          placeholder="Enter your phone number"
          required
        />
      </div>

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
      <ApiContinueSession />
      <ApiSubmit ref="ApiSubmit" :phone="phone" :password="password" />

      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
import ApiContinueSession from "./helpers/api_callers/ApiContinueSession.vue";
import ApiSubmit from "./helpers/api_callers/ApiSubmit.vue";
import formatPhone from "./helpers/format_phone";

export default {
  components: { ApiSubmit, ApiContinueSession },
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
    onPhoneInput() {
      this.phone = formatPhone(this.phone);
    },
  },
};
</script>
