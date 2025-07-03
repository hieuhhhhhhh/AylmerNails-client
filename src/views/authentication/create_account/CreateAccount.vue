<template>
  <div id="layout">
    <form @submit.prevent="onSubmit">
      <div>
        <input
          type="text"
          v-model="firstName"
          placeholder="First Name"
          required
        />

        <input
          type="text"
          v-model="lastName"
          placeholder="Last Name"
          required
        />
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

      <div id="msg">{{ msg }}</div>
      <button class="greenBtn">Add User</button>
    </form>
  </div>
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

<style scoped>
#layout {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100vw;
  margin-inline: auto;
  flex-grow: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
button {
  font-size: 20px;
  padding-inline: 50px;
  border-radius: 20px;
  margin-bottom: 50px;
}
input[type="password"],
input[type="tel"] {
  padding: 6px 10px;
  width: 280px;
}
input[type="text"] {
  width: 123px;
  margin-inline: 5px;
  padding: 6px 10px;
}
#msg {
  color: red;
  font-size: 15px;
}
</style>
