<template>
  <div id="footer">
    <div id="title">Need assistance? Reach out to us!</div>
    <Content v-if="details" :details="details" />
    <div id="editCont">
      <button v-if="isRoleValid" id="edit" @click="toBusinessLinks">
        <FontAwesomeIcon :icon="faWrench" /> Edit Footer
      </button>
    </div>
  </div>
</template>
<script>
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
// lib
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
// pinia
import { useMyProfile, useFooterReact } from "@/stores/myProfile";
import fetchBusinessLinks from "@/views/business_links/apis/fetchBusinessLinks";
// comps
import Content from "./Content.vue";

export default {
  name: "Footer-",
  components: { FontAwesomeIcon, Content },
  setup() {
    // lib
    const router = useRouter();
    // pinia
    const MPstore = useMyProfile();
    const FRstore = useFooterReact();
    const role = computed(() => MPstore.role);
    const validRoles = ["admin", "developer"];
    const isRoleValid = computed(() => validRoles.includes(role.value));
    // resources
    const details = ref(null);

    // INPUT
    const toBusinessLinks = () => {
      router.push("/business_links");
    };
    // API
    const fetchData = async () => {
      details.value = await fetchBusinessLinks();
    };

    // DEPENDENCIES
    watch(
      () => FRstore.react_key,
      async () => {
        await fetchData();
      }
    );

    // LIFECYCLE
    onMounted(async () => {
      await fetchData();
    });

    return {
      toBusinessLinks,
      isRoleValid,
      faWrench,
      details,
    };
  },
};
</script>

<style scoped>
#footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 5px var(--shadow-color);
  background: var(--background-i1);
  padding-top: 10px;
  padding-bottom: 10px;
}
#title {
  font-size: 20px;
  margin-bottom: 10px;
}
#editCont {
  display: flex;
  /* width: 100%; */
  justify-content: flex-end;
}
#edit {
  font-size: 12px;
  padding: 4px;
  background: var(--background-i2);
  color: var(--foreground);
  cursor: pointer;
  margin-bottom: -10px;
}
</style>
