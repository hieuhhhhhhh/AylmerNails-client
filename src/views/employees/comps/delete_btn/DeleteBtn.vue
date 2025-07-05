<template>
  <div class="flex">
    <button id="delete" class="redBtn" @click="onDeleteClicked">
      <FontAwesomeIcon :icon="faTrash" />
      Delete Employee
    </button>
  </div>
  <ConfirmDelete
    v-if="isDeletingEmp"
    :empId="props.empId"
    :onClose="() => (isDeletingEmp = false)"
  />
</template>
<script setup>
import { ref } from "vue";
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
// COMPS
import ConfirmDelete from "./ConfirmDelete.vue";

// PARAMS
const props = defineProps({
  empId: Number,
});

// STATUS
const isDeletingEmp = ref(false);

// HANDLER
function onDeleteClicked() {
  isDeletingEmp.value = true;
}
</script>


<style scoped>
.flex {
  display: flex;
  justify-content: center;
}
#delete {
  padding: 10px 40px;
  border-radius: 20px;
  margin-bottom: 10px;
}
</style>