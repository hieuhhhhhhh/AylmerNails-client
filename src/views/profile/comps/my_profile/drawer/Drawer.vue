<template>
  <div id="drawer" ref="drawer" @blur="onBlur" tabindex="0">
    <button @click="onEditName">Edit my name</button>
    <button @click="onChangePassword(true)">Change my password</button>
    <button>Log out everywhere</button>
  </div>
</template>

<script>
// lib
import { onMounted, ref } from "vue";

export default {
  name: "Drawer-",
  props: {
    onEditName: Function,
    onToogleDrawer: Function,
    onChangePassword: Function,
  },
  setup(props) {
    const drawer = ref(null);

    // INPUT
    const onBlur = (event) => {
      const target = event.relatedTarget;

      if (target && drawer.value.contains(target)) {
        // if event from the 3 buttons, refocus
        drawer.value.focus();
      } else {
        // if not, run the handler
        props.onToogleDrawer();
      }
    };

    // LIFECYCLE
    onMounted(() => {
      // when start, focus the drawer div
      drawer.value.focus();
    });

    return { drawer, onBlur };
  },
};
</script>

<style scoped>
#drawer {
  position: absolute;

  font-size: initial;
}
button {
  width: 200px;
  text-align: left;
  margin: 0;
  margin-left: -165px;
  padding: 7px;
}
</style>