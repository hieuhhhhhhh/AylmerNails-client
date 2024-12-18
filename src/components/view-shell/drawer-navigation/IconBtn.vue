<template>
  <div id="IconBtn">
    <div id="icon">
      <FontAwesomeIcon :icon="menuIcon" />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons

export default {
  components: {
    FontAwesomeIcon, // Register the FontAwesomeIcon component
  },
  data() {
    return {
      menuIcon: faBars, // Assign the correct icon to a variable
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
  -webkit-tap-highlight-color: transparent;
}
@media (orientation: portrait) {
  #IconBtn {
    top: 9px;
    left: 9px;
  }
}

#icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px; /* Increase this value to make the icon larger */
  background: var(--middleground);
  height: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  transition: all 0.5s ease-out; /* Smooth transition */
}
#icon:hover {
  background: var(--hover);
}
#icon:active {
  background: var(--active);
}
</style>
