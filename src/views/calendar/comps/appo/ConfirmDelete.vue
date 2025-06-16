<template>
  <div id="main">
    <div id="title">Permanently remove this appointment?</div>
    <label>Type "yes" to confirm</label>
    <input
      ref="inputRef"
      type="text"
      v-model="text"
      @input="onInput"
      placeholder="yes"
    />
  </div>
</template>

<script>
// lib
import { ref, onMounted } from "vue";
import removeAppo from "../../apis/removeAppo";
import { useRoute, useRouter } from "vue-router";

export default {
  props: {
    appoId: Number,
  },
  setup(props) {
    // lib
    const router = useRouter();
    const route = useRoute();
    // resources
    const text = ref("");
    const inputRef = ref(null);

    const onInput = async () => {
      if (text.value.trim().toLowerCase() === "yes") {
        const res = await removeAppo(props.appoId);
        if (res) {
          await router.push(
            route.path.split("/").slice(0, -1).join("/") || "/"
          );
          router.push("/refresh");
        }
      }
    };

    // LIFECYCLE
    onMounted(() => {
      // when start, auto-focus text input
      if (inputRef.value) {
        inputRef.value.focus();
      }
    });

    return {
      text,
      inputRef,
      onInput,
    };
  },
};
</script>

<style scoped>
#main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
}
#title {
  text-align: center;
  font-size: 18px;
  margin-bottom: 5px;
}
</style>