<template>
  <div id="parent">
    <button @click="onToogleDrawer">
      <FontAwesomeIcon :icon="faCaretDown" />
    </button>
    <Drawer
      v-if="isDrawerOpen"
      :onToogleDrawer="onToogleDrawer"
      :phoneNum="phoneNum"
      :bannedOn="bannedOn"
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

export default {
  name: "DrawerParent",
  props: {
    onEditName: Function,
    phoneNum: String,
    bannedOn: Number,
  },
  components: {
    Drawer,
    FontAwesomeIcon,
  },
  setup() {
    // status
    const isDrawerOpen = ref(false);

    // INPUT
    const onToogleDrawer = async () => {
      isDrawerOpen.value = !isDrawerOpen.value;
    };

    return {
      isDrawerOpen,
      onToogleDrawer,
      faCaretDown,
    };
  },
};
</script>

<style scoped>
#parent {
  position: relative;
}
button {
  font-size: 25px;
  aspect-ratio: 1;
  width: 35px;
}
</style>