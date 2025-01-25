<template>
  <div id="title">
    <FontAwesomeIcon :icon="menuIcon" />
    &nbsp;{{ title }}
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default {
  components: {
    FontAwesomeIcon, // Register the FontAwesomeIcon component
  },
  props: {
    title: String,
  },
  data() {
    return {
      menuIcon: faCaretDown, // Assign the correct icon to a variable
    };
  },
};
</script>


<style scoped>
#title {
  padding: 8px;
  padding-inline: 15px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 5px;
}
/* phone view */
@media (orientation: portrait) {
  #title {
    padding: 16px;
  }
}
</style>