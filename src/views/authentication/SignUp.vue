<template>
  <div id="app">
    <h1>Welcome to Sign Up!</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          v-model="phone"
          @input="formatPhone"
          placeholder="Enter your phonenumber"
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

      <div>
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="Verify your password"
          required
        />
      </div>

      <div v-if="msg" class="error">
        <p>{{ msg }}</p>
      </div>

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      password: "",
      confirmPassword: "",
      msg: "",
    };
  },
  methods: {
    submitForm() {
      if (this.password !== this.confirmPassword) {
        this.msg = "Passwords do not match.";
      } else {
        this.msg = "";
        // Handle form submission logic here
        alert("Signup!");
      }
    },
    formatPhone() {
      // Remove non-numeric characters
      let phone = this.phone.replace(/\D/g, "");

      // Format the phone number (XXX XXX XXXX)
      if (phone.length <= 3) {
        this.phone = phone;
      } else if (phone.length <= 6) {
        this.phone = `${phone.slice(0, 3)} ${phone.slice(3)}`;
      } else {
        this.phone = `${phone.slice(0, 3)} ${phone.slice(3, 6)} ${phone.slice(
          6,
          10
        )}`;
      }
    },
  },
};
</script>
