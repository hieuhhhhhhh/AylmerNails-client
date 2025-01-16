<template>
  <div></div>
</template>

<script>
export default {
  async created() {
    await this.fetchAllServices();
  },
  methods: {
    async fetchAllServices() {
      try {
        // get app path
        const baseURL = process.env.VUE_APP_BASE_URL;

        // start requesting server
        const res = await fetch(`${baseURL}/api/services/get_all_services`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // read status and process reponse
        const data = await res.json();

        if (res.ok) {
          console.log("Sussesful");
        } else {
          console.log("Failed to fetch all services, message: ", data.message);
        }
      } catch (e) {
        console.error("Unexpected Error: ", e);
      }
    },
  },
};
</script>
