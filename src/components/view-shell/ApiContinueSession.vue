// an api caller where it send the server its cookies to continue a session
// the server will read the TOKEN cookie and allow if it is valid

<template>
  <div></div>
</template>

<script>
export default {
  async created() {
    await this.requestContinueSession();
  },
  methods: {
    async requestContinueSession() {
      try {
        // get app path
        const baseURL = process.env.VUE_APP_BASE_URL;

        // start requesting server
        const res = await fetch(
          `${baseURL}/api/authentication/request_continue_session`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          console.log("Session continued.");
        } else {
          // read status and process reponse
          const data = await res.json();
          console.log("Failed to use token, message: ", data.message);
        }
      } catch (e) {
        console.error("Unexpected Error: ", e);
      }
    },
  },
};
</script>
