<template>
  <div id="parent">
    <div id="background" @click="onCancel" />
    <div id="window">
      <button @click="onCancel" id="closeBtn" class="redBtn">
        <FontAwesomeIcon :icon="faXmark" />
      </button>

      <div id="content">
        <form @submit.prevent="onSubmit">
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
          <div class="flexBox">
            <button class="blueBtn">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// lib
import { onMounted, ref } from "vue";
import updateMyProfile from "../../apis/updateProfile";

export default {
  props: {
    userInfo: Object,
    onCancel: Function,
    onFinish: Function,
  },
  components: {
    FontAwesomeIcon,
  },
  setup(props) {
    // payload
    const firstName = ref(null);
    const lastName = ref(null);

    // APIS
    const onSubmit = async () => {
      const res = await updateMyProfile(firstName.value, lastName.value);
      if (res) {
        props.onFinish();
      }
    };

    // LIFECYCLE
    onMounted(() => {
      firstName.value = props.userInfo.firstName;
      lastName.value = props.userInfo.lastName;
    });

    return {
      firstName,
      lastName,
      onSubmit,
      faXmark,
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
  height: 100vh;
  width: 100vw;
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
  font-size: 20px;
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
