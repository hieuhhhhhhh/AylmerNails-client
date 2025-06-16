<template>
  <div id="IconBtn">
    <div id="icon">
      <div v-if="notiCount > 0" id="redDot" />
      <FontAwesomeIcon :icon="menuIcon" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
// pinia
import { useNotificationCount } from "@/stores/myProfile";

export default {
  components: {
    FontAwesomeIcon, // Register the FontAwesomeIcon component
  },
  data() {
    return {
      menuIcon: faBars, // Assign the correct icon to a variable
    };
  },
  setup() {
    const NCstore = useNotificationCount();
    const notiCount = computed(
      () =>
        NCstore.newAppoCount > 0 ||
        NCstore.newCanceledAppoCount > 0 ||
        NCstore.newSavedCount > 0 ||
        NCstore.newUserCount > 0 ||
        NCstore.newBlacklistCount > 0
    );
    return {
      notiCount,
    };
  },
};
</script>

<style scoped>
#IconBtn {
  position: fixed;
  top: 7px;
  left: 7px;
  cursor: pointer;
  user-select: none;
}
@media (orientation: portrait) {
  #IconBtn {
    top: 9px;
    left: 9px;
  }
}

#icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px; /* Increase this value to make the icon larger */
  background: var(--background-i2);
  height: 50px;
  aspect-ratio: 1;
  border-radius: 5px;
  transition: all 0.5s ease-out; /* Smooth transition */
}
#icon:hover {
  background: var(--hover);
}
#redDot {
  position: absolute;
  background: red;
  width: 8px;
  height: 8px;
  top: 14%;
  right: 7%;
  border-radius: 50%;
  border: 2px solid var(--background-i2);
}
</style>
