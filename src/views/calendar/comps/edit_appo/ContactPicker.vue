<template>
  <button @click.prevent="onStopPicking">Back</button>
  <form @submit.prevent="onSubmit">
    <div>
      <input
        type="tel"
        :value="phoneNum"
        @input="onInputPhone"
        placeholder="Enter Phone Number"
        maxlength="15"
      />
    </div>
    <div>
      <input
        type="text"
        v-model="name"
        placeholder="Enter Name"
        @input="onInputName"
      />
    </div>
    <button>Confirm</button>
    <button @click.prevent="onClear">Clear</button>
    <ContactSearch :_query="query" :onSelectContact="onSelectContact" />
  </form>
</template>
<script>
// lib
import { ref, onMounted } from "vue";
import formatPhone from "@/lib/formatPhone";
// comp
import ContactSearch from "./ContactSearch.vue";

export default {
  components: {
    ContactSearch,
  },
  props: {
    _phoneNum: String,
    _name: String,
    onStopPicking: Function,
    setContact: Function,
  },
  setup(props) {
    // payload
    const phoneNum = ref("");
    const name = ref("");
    const query = ref(null);

    // INPUT
    const onSubmit = async () => {
      // parse to real phone
      let real = null;
      if (phoneNum.value.trim() !== "") {
        real = "+1" + phoneNum.value.replace(/\D/g, "");
      }
      props.setContact(real, name.value);
    };

    const onInputPhone = (event) => {
      // Get the raw phone number input value
      let rawPhone = event.target.value.replace(/\D/g, ""); // Remove non-digit characters

      // Format the phone number (XXX XXX XXXX)
      const formatted = addSpaceToPhone(rawPhone);

      // set state
      phoneNum.value = formatted;
      onSearch(rawPhone);
    };

    const onInputName = () => {
      onSearch(name.value);
    };

    const onSearch = (value) => {
      query.value = value;
    };

    const onSelectContact = (newPhone, newName) => {
      phoneNum.value = addSpaceToPhone(newPhone.slice(2));
      name.value = newName;
    };

    const onClear = () => {
      phoneNum.value = "";
      name.value = "";
      query.value = "";
    };

    // LIFECYCLE
    onMounted(() => {
      phoneNum.value = formatPhone(props._phoneNum);
      name.value = props._name;

      onSearch("");
    });

    // HELPERS
    const addSpaceToPhone = (rawPhone) => {
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
      return formatted;
    };

    return {
      phoneNum,
      name,
      query,
      onSubmit,
      onInputPhone,
      onInputName,
      onSearch,
      onSelectContact,
      onClear,
    };
  },
};
</script>
