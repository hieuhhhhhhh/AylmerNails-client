<template>
  <div id="parent">
    <div id="background" @click="onCancel" />
    <div id="window">
      <form @submit.prevent="onSubmit">
        <button @click.prevent="onCancel" id="closeBtn" class="redBtn">
          X
        </button>
        <div id="content">
          <label>First Name</label>
          <input
            type="text"
            v-model="firstName"
            placeholder="Enter First Name"
            required
          />
          <br />
          <br />
          <label>Last Name</label>
          <input
            type="text"
            v-model="lastName"
            placeholder="Enter Last Name"
            required
          />
        </div>
        <div class="flexBox">
          <button class="blueBtn">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// lib
import { onMounted, ref } from "vue";

export default {
  props: {
    userInfo: Object,
    onCancel: Function,
  },
  setup(props) {
    // payload
    const firstName = ref(null);
    const lastName = ref(null);

    // LIFECYCLE
    onMounted(() => {
      firstName.value = props.userInfo.firstName;
      lastName.value = props.userInfo.lastName;
    });

    return {
      firstName,
      lastName,
    };
  },
};
</script>

<style scoped>
#parent {
  z-index: 15;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#background {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
#window {
  position: relative;
  z-index: 20;
  width: 300px;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
  max-height: 80%;
}
#content {
  padding: 20px;

  margin-top: 15px;
}
#closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  aspect-ratio: 1;
  height: 30px;
  padding: 0;
  border-radius: 0;
}
input {
  width: 100%;
  box-sizing: border-box;
}
table {
  text-align: left;
}
.flexBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
</style>
