<template>
  <button @click.prevent="onStopPicking">Back</button>
  <form @submit.prevent="onSubmit">
    <div>
      <input
        type="text"
        :value="phoneNum"
        @input="onInputPhone"
        placeholder="Enter Phone Number"
        maxlength="15"
        required
      />
    </div>
    <div>
      <input type="text" v-model="name" placeholder="Enter Name" required />
    </div>
    <button>Confirm</button>
  </form>
</template>
<script>
// lib
import { ref } from "vue";

export default {
  props: {
    onStopPicking: Function,
    setContact: Function,
  },
  setup(props) {
    // payload
    const phoneNum = ref("");
    const name = ref("");

    const onSubmit = async () => {
      // parse to real phone
      const real = "+1" + phoneNum.value.replace(/\D/g, "");
      props.setContact(real, name.value);
    };

    const onInputPhone = (event) => {
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

      // set state
      phoneNum.value = formatted;
    };

    return {
      phoneNum,
      name,
      onSubmit,
      onInputPhone,
    };
  },
};
</script>
