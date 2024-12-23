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

        // read status and process response
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          alert("token works!");
        }
      } catch (e) {
        console.error("Unexpected Error: ", e);
      }
    },
  },
};
</script>
