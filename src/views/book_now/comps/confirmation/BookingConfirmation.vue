<template>
  <div>this is confirmation</div>
  {{ chain_ }}
  {{ date_ }}
</template>
<script setup>
import { onMounted, ref } from "vue";

// PARAMS
const props = defineProps({
  chain: Object,
  date: Number,
  onClearForm: Function,
});

// RESOURCES
const chain_ = ref(props.chain);
const date_ = ref(props.date);

// LIFECYCLE
onMounted(() => {
  props.onClearForm();
});
</script>

<script>
export default {};
</script>
