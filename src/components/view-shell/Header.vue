<template>
  <div id="header">
    <div id="title">
      <router-link to="/">Aylmer Nails & Spa</router-link>
    </div>
    <div id="wrapper">
      <div v-if="!isLoggedIn" id="login">
        <router-link to="/login">
          <FontAwesomeIcon :icon="faRightToBracket" />
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
// icons
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

// pinia
import { useMyProfile } from "@/stores/myProfile";
import { computed } from "vue";
const MPstore = useMyProfile();
const isLoggedIn = computed(() => MPstore.token);
</script>

<script>
export default {
  name: "Header-",
};
</script>

<style scoped>
#header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px var(--shadow-color);
  background: var(--background-i2);
  padding: 17px;
  z-index: 10;
}
#title {
  font-size: 26px;
  padding-inline: 43px;
}
#wrapper {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: -1;
}
#login {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  cursor: pointer;
  aspect-ratio: 1;
  margin: 7px;
}
#login:hover,
#login:active {
  background: var(--hover);
}

@media (orientation: portrait) {
  #Header {
    padding: 19px;
  }
}

@media (max-width: 500px) {
  #title {
    font-size: 20px;
    padding-top: 3px;
    padding-bottom: 3px;
  }
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
