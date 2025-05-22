<template>
  <div>
    <label for="phone">Phone Number:</label>
    <input
      type="tel"
      id="phone"
      :value="phone"
      @input="onPhoneInput"
      placeholder="North Americam number"
      required
    />
  </div>
</template>

<script>
export default {
  props: {
    phone: String,
    setPhone: Function,
  },
  methods: {
    onPhoneInput(event) {
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
        )} ${rawPhone.slice(6)}`;
      }

      // Send the phone number to parent component
      this.setPhone(formatted);
    },
  },
};
</script>
