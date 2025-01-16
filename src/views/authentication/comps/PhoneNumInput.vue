<template>
  <div>
    <label for="phone">Phone Number:</label>
    <input
      type="tel"
      id="phone"
      v-model="phone"
      @input="setPhone"
      placeholder="Enter your phone number"
      required
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
    };
  },
  methods: {
    setPhone(event) {
      // Get the raw phone number input value
      let rawPhone = event.target.value.replace(/\D/g, ""); // Remove non-digit characters

      // Format the phone number (XXX XXX XXXX)
      let formatted = "";

      if (rawPhone.length <= 3) {
        formatted = rawPhone;
      } else if (rawPhone.length <= 6) {
        formatted = `${rawPhone.slice(0, 3)} ${rawPhone.slice(3)}`;
      } else {
        formatted = `${rawPhone.slice(0, 3)} ${rawPhone.slice(
          3,
          6
        )} ${rawPhone.slice(6, 10)}`;
      }

      // update state
      this.phone = formatted;
    },
  },
};
</script>
