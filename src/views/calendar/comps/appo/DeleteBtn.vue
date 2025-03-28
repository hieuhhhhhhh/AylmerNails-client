<template>
  <div v-if="!isDeletingAppo" id="flexBox">
    <button class="btn" @click="onEditAppo(appoId)">Edit</button>
    <button class="btn" @click="onDelete">Delete</button>
  </div>
  <ConfirmDelete v-else :appoId="appoId" />
</template>
<script>
// lib
import { ref } from "vue";
// comps
import ConfirmDelete from "./ConfirmDelete.vue";

export default {
  components: {
    ConfirmDelete,
  },
  props: {
    appoId: Number,
    onEditAppo: Function,
  },
  setup() {
    // status
    const isDeletingAppo = ref(false);

    // INPUT
    const onDelete = () => {
      isDeletingAppo.value = true;
    };

    return {
      isDeletingAppo,
      onDelete,
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
#flexBox {
  display: flex;
  gap: 50px;
  justify-content: center;
  margin-top: 15px;
}
</style>