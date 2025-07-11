<template>
  <div></div>
</template>

<script>
// global states
import { useMyProfile } from "@/stores/myProfile";

export default {
  data() {
    return {
      interval: null,
    };
  },
  async created() {
    await this.requestContinueSession();

    // re-login every 20 minutes
    this.interval = setInterval(() => {
      this.requestContinueSession();
    }, 20 * 60 * 1000);
  },
  beforeUnmount() {
    if (this.interval) clearInterval(this.interval);
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
          store.clearMyProfile();
          console.log("Failed to use token, message: ", json.message);
        }
      } catch (e) {
        console.error("Unexpected Error: ", e);
      }
    },
  },
};
</script>
