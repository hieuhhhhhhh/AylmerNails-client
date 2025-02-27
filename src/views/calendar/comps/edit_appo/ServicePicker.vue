<template>
  <button @click="onStopPicking">Back</button>
  <div>This is Service Picker</div>
</template>
<script>
export default {
  props: {
    setService: Function,
    onStopPicking: Function,
  },
  setup() {},
};
</script>
