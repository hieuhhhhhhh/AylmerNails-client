<template>
  <div id="parent">
    <div id="background" @click="onCancel" />
    <div id="window">
      <button @click="props.onCancel" id="closeBtn" class="redBtn">
        <FontAwesomeIcon :icon="faXmark" />
      </button>

      <div id="content">
        <form @submit.prevent="onSubmit">
          <div id="title">Select {{ name }}'s new role</div>
          <div>
            <select v-model="role" required>
              <option :value="'client'">Client</option>
              <option :value="'admin'">Admin</option>
            </select>
          </div>
          <button id="confirm" class="blueBtn">Confirm</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// apis
import updateUserRole from "../../apis/updateUserRole";
import { useRouter } from "vue-router";

// RESOURCES
const router = useRouter();

// PARAMS
const props = defineProps({
  onCancel: Function,
  name: String,
  userId: Number,
});
// PAYLOAD
const role = ref(null);

async function onSubmit() {
  const res = await updateUserRole(props.userId, role.value);
  if (res) {
    router.push("/refresh");
  }
}
</script>

<script>
export default {};
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
  font-size: 20px;
  margin-top: 15px;
  text-align: center;
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
#confirm {
  margin-top: 10px;
  padding: 5px 15px;
}
</style>