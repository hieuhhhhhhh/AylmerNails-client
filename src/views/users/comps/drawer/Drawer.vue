<template>
  <div id="drawer" ref="drawer" @blur="onBlur" tabindex="0">
    <button @click="onChangeRole">Change user's role</button>
    <button
      v-if="bannedOn == null"
      :style="{ color: 'red' }"
      @click="onBanUnban"
    >
      Ban this account
    </button>
    <button v-else :style="{ color: 'green' }" @click="onBanUnban">
      Unban this account
    </button>
  </div>
</template>

<script>
// lib
import { onMounted, ref } from "vue";
import banUnbanPhoneNum from "../../apis/banUnbanPhoneNum";
import { useRouter } from "vue-router";

export default {
  name: "Drawer-",
  props: {
    onToogleDrawer: Function,
    phoneNum: String,
    bannedOn: Number,
    onChangeRole: Function,
  },

  setup(props) {
    const router = useRouter();
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

    const onBanUnban = async () => {
      const res = await banUnbanPhoneNum(
        props.phoneNum,
        props.bannedOn == null
      );
      if (res) {
        router.push("/refresh");
      }
    };

    // LIFECYCLE
    onMounted(() => {
      // when start, focus the drawer div
      drawer.value.focus();
    });

    return { drawer, onBlur, onBanUnban };
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