<template>
  <button @click="onEditName">Edit my name</button>
  <button>Change my password</button>
  <button>Log out everywhere</button>
</template>

<script>
// lib

export default {
  name: "Drawer-",
  props: {
    onEditName: Function,
  },
  setup() {},
};
</script>
