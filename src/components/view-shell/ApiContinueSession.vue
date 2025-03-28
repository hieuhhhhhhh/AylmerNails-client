<template>
  <div></div>
</template>

<script>
// global states
import { useMyProfile } from "@/stores/myProfile";

export default {
  async created() {
    await this.requestContinueSession();
  },
  methods: {
    async requestContinueSession() {
      const store = useMyProfile(); // Access Pinia store
      try {
        const baseURL = process.env.VUE_APP_BASE_URL;

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

        // read json
        const json = await res.json();

        if (res.ok) {
          console.log("Session Continued.");
          store.setMyProfile({
            token: json.token,
            role: json.user_role,
          });
        } else {
          console.log("Failed to use token, message: ", json.message);
        }
      } catch (e) {
        console.error("Unexpected Error: ", e);
      }
    },
  },
};
</script>
