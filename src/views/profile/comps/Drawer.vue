<template>
  <button>Drawer</button>
  <button @click="onEditName">Edit Name</button>
</template>

<script>
export default {
  name: "Drawer-",
  props: {
    onEditName: Function,
  },
  setup() {},
};
</script>
