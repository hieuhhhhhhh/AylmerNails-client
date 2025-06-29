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
      :onLogOutAll="onLogOutAll"
    />
    <ChangePassword
      v-if="isChangingPW"
      :onCancel="() => onChangePassword(false)"
    />
    <LogOutEverywhere
      v-if="isLoggingOutAll"
      :onCancel="() => onLogOutAll(false)"
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
import LogOutEverywhere from "./LogOutEverywhere.vue";

export default {
  name: "DrawerParent",
  props: {
    onEditName: Function,
  },
  components: {
    Drawer,
    FontAwesomeIcon,
    ChangePassword,
    LogOutEverywhere,
  },
  setup() {
    // status
    const isDrawerOpen = ref(false);
    const isChangingPW = ref(false);
    const isLoggingOutAll = ref(false);

    // INPUT
    const onToogleDrawer = async () => {
      isDrawerOpen.value = !isDrawerOpen.value;
    };

    const onChangePassword = (value = true) => {
      isChangingPW.value = value;
    };

    const onLogOutAll = (value = true) => {
      isLoggingOutAll.value = value;
    };

    return {
      isDrawerOpen,
      onToogleDrawer,
      faCaretDown,
      isChangingPW,
      onChangePassword,
      isLoggingOutAll,
      onLogOutAll,
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