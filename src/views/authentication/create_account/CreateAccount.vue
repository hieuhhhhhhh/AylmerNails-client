<template>
  <form @submit.prevent="onSubmit">
    <div>
      <input
        type="text"
        v-model="firstName"
        placeholder="First Name"
        required
      />
    </div>
    <div>
      <input type="text" v-model="lastName" placeholder="Last Name" required />
    </div>
    <div>
      <input
        type="tel"
        v-model="phoneNum"
        placeholder="Phone Number"
        required
      />
    </div>
    <div>
      <input
        type="password"
        v-model="password"
        placeholder="New Password"
        required
      />
    </div>

    <div>{{ msg }}</div>
    <button>Add User</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// apis
import addUser from "../apis/addUser";

// RESOURCES
const router = useRouter();

// PAYLOAD
const phoneNum = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");

// OUTPUT
const msg = ref("");

// APIS
async function onSubmit() {
  const { userId, message } = await addUser(
    phoneNum.value,
    password.value,
    firstName.value,
    lastName.value
  );

  //   if fail
  if (!userId) {
    msg.value = message;
    return;
  }

  // if succesful
  router.push(`/users/${userId}`);
}
</script>

