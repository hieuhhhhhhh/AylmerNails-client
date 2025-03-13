<template>
  <button class="btn" @click="removeAppo(appoId)">Delete</button>
</template>
<script>
import removeAppo from "../../apis/removeAppo";

export default {
  props: {
    appoId: Number,
  },
  setup() {
    return {
      removeAppo,
    };
  },
};
</script>

<style scoped>
.btn {
  background-color: white;
  padding: 2px;
  padding-inline: 10px;
}
</style>