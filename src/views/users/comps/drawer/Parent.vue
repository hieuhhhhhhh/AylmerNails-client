<template>
  <div id="relative">
    <button @click="onToogleDrawer">
      <FontAwesomeIcon :icon="faCaretDown" />
    </button>
    <Drawer
      v-if="isDrawerOpen"
      :onToogleDrawer="onToogleDrawer"
      :phoneNum="phoneNum"
      :bannedOn="bannedOn"
      :onChangeRole="onChangeRole"
    />
  </div>
  <ChangeUserRole
    v-if="isChangingRole"
    :name="name"
    :userId="userId"
    :onCancel="() => onChangeRole(false)"
  />
</template>

<script>
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
// lib
import { ref } from "vue";
// comps
import Drawer from "./Drawer.vue";
import ChangeUserRole from "./ChangeUserRole.vue";

export default {
  name: "DrawerParent",
  props: {
    onEditName: Function,
    phoneNum: String,
    bannedOn: Number,
    name: String,
    userId: Number,
  },
  components: {
    Drawer,
    FontAwesomeIcon,
    ChangeUserRole,
  },
  setup() {
    // status
    const isDrawerOpen = ref(false);
    const isChangingRole = ref(false);

    // INPUT
    const onToogleDrawer = async () => {
      isDrawerOpen.value = !isDrawerOpen.value;
    };

    const onChangeRole = (value = true) => {
      isChangingRole.value = value;
    };

    return {
      isDrawerOpen,
      onToogleDrawer,
      faCaretDown,
      isChangingRole,
      onChangeRole,
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