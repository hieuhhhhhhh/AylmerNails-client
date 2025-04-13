<template>
  <div id="layout">
    <div id="bar">
      <router-link to="/users/accounts" class="btn" active-class="btn selected">
        Accounts
        <div v-if="accountCount > 0" class="noti">
          {{ accountCount }}
        </div>
      </router-link>
      <router-link to="/users/clients" class="btn" active-class="btn selected">
        Clients
      </router-link>
      <router-link
        to="/users/blacklist"
        class="btn"
        active-class="btn selected"
      >
        Blacklist
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script setup>
// pinia
import { useNotificationCount } from "@/stores/myProfile";
import { computed } from "vue";
const NCstore = useNotificationCount();
const accountCount = computed(() => NCstore.newUserCount);
</script>

<script>
export default {
  name: "Layout-",
};
</script>

<style scoped>
#layout {
  background-color: var(--background-i1);
  padding: 10px;
  width: 900px;
  max-width: 100vw;
  margin-inline: auto;
  flex-grow: 1;
  box-sizing: border-box;
}
#title {
  font-size: 25px;
  padding: 10px;
}
#bar {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.btn {
  border: 1px solid rgba(128, 128, 128, 0.6);
  font-size: 14px;
  padding: 5px 15px;
  border-radius: 15px;
  background: var(--background-i2);
  color: var(--foreground);
  cursor: pointer;
  text-decoration: none;
  display: flex;
  gap: 6px;
}
.btn.selected {
  color: var(--background-i0);
  background: var(--foreground);
}
.btn:active {
  background: gray;
}
.noti {
  background: var(--trans-red);
  color: white;
  aspect-ratio: 1;
  width: 16px;
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -2px;
}
</style>
