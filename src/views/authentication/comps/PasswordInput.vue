<template>
  <div>
    <label for="password">Password:</label>
    <input
      type="password"
      id="password"
      @input="setPassword"
      placeholder="Enter your password"
      required
    />
  </div>
</template>

<script>
export default {
  methods: {
    setPassword(event) {
      // Send the parent to parent component
      this.$emit("update:password", event.target.value);
    },
  },
};
</script>
