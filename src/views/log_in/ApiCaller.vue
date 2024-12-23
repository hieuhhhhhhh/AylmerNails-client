<template>
  <div>
    <!-- Empty div, only for handling the data -->
  </div>
</template>

<script>
export default {
  props: ["phone", "password"],
  methods: {
    printToConsole() {
      // Print phone and password to the console
      console.log("Phone Number:", this.phone);
      console.log("Password:", this.password);
    },
  },
};
</script>
