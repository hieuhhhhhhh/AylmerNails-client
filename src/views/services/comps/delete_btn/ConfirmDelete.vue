<template>
  <div id="parent">
    <div id="background" @click="props.onClose()" />

    <div id="window">
      <button @click="props.onClose()" id="closeBtn" class="redBtn">
        <FontAwesomeIcon :icon="faXmark" />
      </button>

      <div id="content">
        <div>Permanently delete this service?</div>

        <label>Type "yes" to confirm </label>
        <input
          ref="inputRef"
          type="text"
          v-model="text"
          @input="onInput"
          placeholder="yes"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// APIS
import deleteService from "../../apis/deleteService";

// PARAMS
const props = defineProps({
  onClose: Function,
  serviceId: Number,
});

// RESOURCES
const router = useRouter();
const text = ref("");
const inputRef = ref(null);

// HANDLER
const onInput = async () => {
  if (text.value.trim().toLowerCase() === "yes") {
    const res = await deleteService(props.serviceId);
    props.onClose();
    if (res) {
      router.push("/services");
    }
  }
};
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
  min-height: 100px;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
}
#content {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  aspect-ratio: 1;
  height: 30px;
  padding: 0;
  border-radius: 0;
  border: none;
  font-size: 20px;
}
</style>