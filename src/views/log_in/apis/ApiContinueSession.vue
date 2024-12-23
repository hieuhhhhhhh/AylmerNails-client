<template>
  <div></div>
</template>

<script>
export default {
  async created() {
    await this.submitCredentials();
  },
  methods: {
    async submitCredentials() {
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

        // read status and process reponse
        const data = await res.json();

        if (res.ok) {
          console.log("Session continued.");
        } else {
          console.log("Failed to use token: ", data.message);
        }
      } catch (e) {
        console.error("Unexpected Error: ", e);
      }
    },
  },
};
</script>
