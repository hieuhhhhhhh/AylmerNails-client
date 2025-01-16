<template>
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
</template>

<script>
export default {
  data() {
    return {
      password: "",
    };
  },
};
</script>

<style scoped>
/* Add any styles if needed */
</style>
