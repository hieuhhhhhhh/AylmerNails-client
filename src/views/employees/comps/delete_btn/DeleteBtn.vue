<template>
  <div id="flexBox">
    <button id="delete" class="btn" @click="onDeleteClicked">
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


