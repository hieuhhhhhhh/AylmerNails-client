<template>
  <div v-if="!isDeletingAppo" id="flexBox">
    <button v-if="savedOn == null" class="btn" @click="onSaveUnsaveAppo()">
      <FontAwesomeIcon :icon="faBookmark" />
      Save
    </button>
    <button v-else class="btn" @click="onSaveUnsaveAppo()">
      <FontAwesomeIcon :icon="regularBM" />
      Unsave
    </button>

    <button class="btn" @click="onEditAppo(appoId)">
      <FontAwesomeIcon :icon="faPen" />
      Edit
    </button>
    <button id="delete" class="btn" @click="onDelete">
      <FontAwesomeIcon :icon="faTrash" />
      Delete
    </button>
  </div>
  <ConfirmDelete v-else :appoId="appoId" />
</template>
<script>
// lib
import { ref } from "vue";
// comps
import ConfirmDelete from "./ConfirmDelete.vue";
// icon
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash, faPen, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBM } from "@fortawesome/free-regular-svg-icons";
import saveUnsaveAppo from "../../apis/saveUnsaveAppo";
import { useRouter } from "vue-router";

export default {
  components: {
    ConfirmDelete,
    FontAwesomeIcon,
  },
  props: {
    appoId: Number,
    onEditAppo: Function,
    savedOn: Number,
  },
  setup(props) {
    // status
    const isDeletingAppo = ref(false);
    const router = useRouter();

    // INPUT
    const onDelete = () => {
      isDeletingAppo.value = true;
    };

    const onSaveUnsaveAppo = async () => {
      const res = await saveUnsaveAppo(props.appoId, props.savedOn == null);
      if (res) {
        // console.log("saved");
        router.push("/refresh");
      }
    };

    return {
      isDeletingAppo,
      onDelete,
      faTrash,
      faPen,
      faBookmark,
      regularBM,
      onSaveUnsaveAppo,
    };
  },
};
</script>

<style scoped>
.btn {
  background-color: white;
  padding: 2px;
  padding-inline: 10px;
}
#flexBox {
  display: flex;
  gap: 50px;
  justify-content: center;
  margin-top: 15px;
}
#delete {
  color: red;
}
</style>