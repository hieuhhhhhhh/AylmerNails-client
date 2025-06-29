<template>
  <div id="relative">
    <button @click="onToogleDrawer">
      <FontAwesomeIcon :icon="faCaretDown" />
    </button>
    <Drawer
      v-if="isDrawerOpen"
      :onEditName="onEditName"
      :onToogleDrawer="onToogleDrawer"
      :onChangePassword="onChangePassword"
    />
    <ChangePassword
      v-if="isChangingPW"
      :onCancel="() => onChangePassword(false)"
    />
  </div>
</template>

<script>
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
// lib
import { ref } from "vue";
// comps
import Drawer from "./Drawer.vue";
import ChangePassword from "./ChangePassword.vue";

export default {
  name: "DrawerParent",
  props: {
    onEditName: Function,
  },
  components: {
    Drawer,
    FontAwesomeIcon,
    ChangePassword,
  },
  setup() {
    // status
    const isDrawerOpen = ref(false);
    const isChangingPW = ref(false);

    // INPUT
    const onToogleDrawer = async () => {
      isDrawerOpen.value = !isDrawerOpen.value;
    };

    const onChangePassword = (value = true) => {
      isChangingPW.value = value;
    };

    return {
      isDrawerOpen,
      onToogleDrawer,
      faCaretDown,
      isChangingPW,
      onChangePassword,
    };
  },
};
</script>

<style scoped>
#relative {
  position: relative;
}
button {
  font-size: 25px;
  aspect-ratio: 1;
  width: 35px;
}
</style>