// to pass phone num and password from parent to the login api

<template>
  <div v-if="msg" class="error">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
// pinia
import { useMyProfile } from "@/stores/myProfile";

export default {
  data() {
    return {
      msg: "",
    };
  },
  props: {
    phone: String,
    password: String,
  },
  methods: {
    async submitCredentials() {
      try {
        // reformat phone number
        const formatted = "+1" + this.phone.replace(/\D/g, "");

        // get app path
        const baseURL = process.env.VUE_APP_BASE_URL;

        console.log("formatted", formatted);
        // start requesting server
        const res = await fetch(
          `${baseURL}/api/authentication/request_log_in`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone_num: formatted,
              password: this.password,
            }),
          }
        );

        // read json
        const json = await res.json();

        // read status and process reponse
        if (res.ok) {
          // update pinia states
          const store = useMyProfile();

          store.setMyProfile({
            token: json.token,
            role: json.user_role,
          });
          this.$router.push("/");
        } else {
          const data = await res.json();
          this.msg = data.message;
        }
      } catch (e) {
        console.error("Unexpected Error: ", e);
      }
    },
  },
};
</script>
