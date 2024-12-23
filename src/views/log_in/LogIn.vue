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

      <!-- Add ref to access ApiCaller methods -->
      <ApiCaller ref="ApiCaller" :phone="phone" :password="password" />

      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
import ApiCaller from "./ApiCaller.vue";
import formatPhone from "./helpers/format_phone";

export default {
  components: { ApiCaller },
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      // Call printToConsole method of ApiCaller component via ref
      this.$refs.ApiCaller.printToConsole();
    },
    onPhoneInput() {
      this.phone = formatPhone(this.phone);
    },
  },
};
</script>
