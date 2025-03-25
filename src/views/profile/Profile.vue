<template>
  <ProfileInfo :userInfo="userInfo" />
  <UserAppos :appos="appos" />
</template>

<script>
// lib
import { ref, onMounted } from "vue";
import fetchMyProfile from "./apis/fetchMyProfile";
// comp
import ProfileInfo from "./comps/my_profile/ProfileInfo.vue";
import UserAppos from "./comps/my_profile/UserAppos.vue";

export default {
  name: "Profile-",
  components: {
    ProfileInfo,
    UserAppos,
  },
  setup() {
    // resources
    const userInfo = ref({});
    const appos = ref([]);

    // LIFECYCLE
    onMounted(async () => {
      // call api
      let apiRes = await fetchMyProfile();

      userInfo.value = apiRes.userInfo;
      appos.value = apiRes.appos;
    });

    return {
      appos,
      userInfo,
    };
  },
};
</script>
