<template>
  <div id="drawer" ref="drawer" @blur="onBlur" tabindex="0">
    <button @click="onChangeRole">Change user's role</button>
    <button
      v-if="bannedOn == null"
      :style="{ color: 'red' }"
      @click="onBanUnban"
    >
      Move to blacklist
    </button>
    <button v-else :style="{ color: 'green' }" @click="onBanUnban">
      Remove from blacklist
    </button>
  </div>
  <ChangeUserRole v-if="isChangingRole" />
</template>

<script>
// lib
import { onMounted, ref } from "vue";
import banUnbanPhoneNum from "../../apis/banUnbanPhoneNum";
import { useRouter } from "vue-router";

// comps
import ChangeUserRole from "./ChangeUserRole.vue";

export default {
  name: "Drawer-",
  props: {
    onToogleDrawer: Function,
    phoneNum: String,
    bannedOn: Number,
  },
  components: {
    ChangeUserRole,
  },
  setup(props) {
    const router = useRouter();
    const drawer = ref(null);

    // status
    const isChangingRole = ref(false);

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

    const onBanUnban = async () => {
      const res = await banUnbanPhoneNum(
        props.phoneNum,
        props.bannedOn == null
      );
      if (res) {
        router.push("/refresh");
      }
    };

    const onChangeRole = () => {
      isChangingRole.value = true;
    };

    // LIFECYCLE
    onMounted(() => {
      // when start, focus the drawer div
      drawer.value.focus();
    });

    return { drawer, onBlur, onBanUnban, isChangingRole, onChangeRole };
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
  padding: 7px;
}
</style>