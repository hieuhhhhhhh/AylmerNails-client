<template>
  <div id="app">
    <h1>Welcome to Log In!</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          v-model="phone"
          @input="formatPhone"
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
export default {
  data() {
    return {
      phone: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    async submitForm() {
      // prepare path
      const baseURL = process.env.VUE_APP_BASE_URL;

      // send request to server
      try {
        const res = await fetch(
          `${baseURL}/api/authentication/request_log_in`,
          {
            method: "POST", // Specify POST method
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
            },
            body: JSON.stringify({
              phone_num: this.phone,
              password: this.password,
            }), // Convert the data to JSON format
          }
        );

        // read status and process reponse
        if (res.ok) {
          alert("Signup!");
        } else {
          const data = await res.json();
          this.msg = data.message;
        }

        // unexpected exception
      } catch (e) {
        console.error("Unexpected Error: ", e);
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
