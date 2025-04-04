<template>
  <UserInfo :info="info" />
  <UserAppos :name="info.firstName" :appos="appos" />
</template>

<script>
// lib
import fetchUserDetails from "./apis/fetchUserDetails";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
// comps
import UserInfo from "./comps/UserInfo.vue";
import UserAppos from "./comps/UserAppos.vue";

export default {
  name: "User-",
  components: { UserInfo, UserAppos },
  setup() {
    // lib
    const route = useRoute();
    // resources
    const info = ref({});
    const appos = ref([]);

    // LIFECYCLE
    onMounted(async () => {
      const userId = Number(route.params.userId);
      const res = await fetchUserDetails(userId);
      info.value = res.info;
      appos.value = res.appos;
    });

    return { info, appos };
  },
};
</script>
