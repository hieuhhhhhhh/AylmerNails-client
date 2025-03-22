<template>
  <h1>This is profile</h1>
  <div>{{ userInfo }}</div>
  <div>{{ appos }}</div>
</template>

<script>
// lib
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import fetchMyProfile from "./apis/fetchMyProfile";
import fetchProfile from "./apis/fetchProfile";

export default {
  name: "Profile-",
  setup() {
    // lib
    const route = useRoute();
    // resources
    const userInfo = ref({});
    const appos = ref([]);

    // LIFECYCLE
    onMounted(async () => {
      const userId = route.params.unixDate;

      // call api
      let apiRes = userId ? await fetchProfile(userId) : await fetchMyProfile();

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
