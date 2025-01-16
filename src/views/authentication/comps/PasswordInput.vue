<template>
  <div>
    <label for="password">Password:</label>
    <input
      type="password"
      id="password"
      v-model="password"
      @input="setPassword"
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
  methods: {
    setPassword(event) {
      this.password = event.target.value;

      // Emit the updated password to the parent component
      this.$emit("update:password", this.password);
    },
  },
};
</script>
