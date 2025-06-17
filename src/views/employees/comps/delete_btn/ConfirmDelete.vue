<template>
  <div id="parent">
    <div id="background" @click="props.onClose()" />

    <div id="window">
      <button @click="props.onClose()" id="closeBtn" class="redBtn">X</button>
      <div id="content">Permanently delete this employee?</div>
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
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// APIS
import deleteEmployee from "../../apis/deleteEmployee";

// PARAMS
const props = defineProps({
  onClose: Function,
  empId: Number,
});

// RESOURCES
const router = useRouter();
const text = ref("");
const inputRef = ref(null);

// HANDLER
const onInput = async () => {
  if (text.value.trim().toLowerCase() === "yes") {
    const res = await deleteEmployee(props.empId);
    props.onClose();
    if (res) {
      router.push("/employees");
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
  border: none;
}
</style>