<template>
  <div id="parent">
    <div id="background" @click="onCancel" />
    <div id="window">
      <button @click.prevent="onCancel" id="closeBtn" class="redBtn">X</button>
      <div id="content">
        <AppoInfo :appo="appo" />
        <ConfirmDelete v-if="isCancelingAppo" :appoId="appo.appoId" />
      </div>
      <div v-if="!isCancelingAppo">
        <div id="duo">
          <button class="redBtn" @click="onCancelAppo">
            Cancel This Appoinment
          </button>
          <button
            v-if="isRoleValid"
            class="greenBtn"
            @click="onOpenCalendar(appo.date, appo.appoId)"
          >
            Open Calendar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// lib
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
// comps
import AppoInfo from "./AppoInfo.vue";
import ConfirmDelete from "./ConfirmDelete.vue";
// pinia
import { useMyProfile } from "@/stores/myProfile";

export default {
  name: "AppoModal",
  components: {
    AppoInfo,
    ConfirmDelete,
  },
  props: {
    appo: Object,
    onCancel: Function,
  },
  setup() {
    // status
    const isCancelingAppo = ref(false);
    // lib
    const router = useRouter();
    // pinia
    const MPstore = useMyProfile();
    const role = computed(() => MPstore.role);
    const validRoles = ["admin", "developer"];
    const isRoleValid = computed(() => validRoles.includes(role.value));

    // INPUT
    const onOpenCalendar = (date, appoId) => {
      router.push(`/calendar/${date}/${appoId}`);
    };
    const onCancelAppo = () => {
      isCancelingAppo.value = true;
    };

    return {
      onOpenCalendar,
      isRoleValid,
      isCancelingAppo,
      onCancelAppo,
    };
  },
};
</script>

<style scoped>
#parent {
  z-index: 15;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#background {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
}
#window {
  position: relative;
  z-index: 20;
  width: 300px;
  max-width: 100%;
  max-height: 100%;
  background-color: var(--background-i2);
  overflow-y: auto;
  max-height: 80%;
}
#content {
  padding: 20px;

  margin-top: 15px;
}
#closeBtn {
  position: absolute;
  top: 0;
  right: 0;
  aspect-ratio: 1;
  height: 30px;
  padding: 0;
  border-radius: 0;
}
#duo {
  display: flex;
  gap: 15px;
  justify-content: center;
  padding: 10px;
}
button {
  padding: 3px;
}
</style>
