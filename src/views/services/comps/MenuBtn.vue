<template>
  <div id="title">
    <FontAwesomeIcon :icon="menuIcon" />
    Services
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons"; // Proper import for icons

export default {
  components: {
    FontAwesomeIcon, // Register the FontAwesomeIcon component
  },
  data() {
    return {
      menuIcon: faCircleChevronDown, // Assign the correct icon to a variable
    };
  },
};
</script>


<style scoped>
#title {
  margin: 0;
  padding: 5px;
  padding-inline: 15px;
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
  border-radius: 5px;
}
#title:hover,
title:active {
  background-color: var(--background-i2);
  width: fit-content;
  box-shadow: 0 0 5px var(--shadow-color);
}
</style>