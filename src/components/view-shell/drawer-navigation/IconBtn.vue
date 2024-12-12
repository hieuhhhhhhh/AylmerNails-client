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
  top: 5px;
  left: 10px;
  cursor: pointer;
  user-select: none;
}

#icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px; /* Increase this value to make the icon larger */
  /* background: rgba(251, 64, 64, 0.5); red notification color*/
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
