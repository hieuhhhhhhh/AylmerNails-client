<template>
  <div>
    <label for="password">Password:</label>
    <input
      type="password"
      id="password"
      @input="onInput"
      placeholder="Enter your password"
      required
    />
  </div>
</template>

<script>
export default {
  props: {
    password: String,
    setPassword: Function,
  },
  methods: {
    onInput(event) {
      // Send the parent to parent component
      this.setPassword(event.target.value);
    },
  },
};
</script>
