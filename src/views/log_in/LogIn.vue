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

      <div v-if="msg" class="error">
        <p>{{ msg }}</p>
      </div>

      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script>
import formatPhone from "./helpers/format_phone";
import submitCredentials from "./helpers/submit_credentials";

export default {
  data() {
    return {
      phone: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    async onSubmit() {
      try {
        const res = await submitCredentials(this.phone, this.password);

        // read status and process reponse
        if (res.ok) {
          this.$router.push("./");
        } else {
          const data = await res.json();
          this.msg = data.message;
        }

        // unexpected exception
      } catch (e) {
        console.error("Unexpected Error: ", e);
      }
    },
    onPhoneInput() {
      this.phone = formatPhone(this.phone);
    },
  },
};
</script>
