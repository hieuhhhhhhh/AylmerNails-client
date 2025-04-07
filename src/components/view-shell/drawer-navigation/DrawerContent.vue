<template>
  <div id="DrawerContent">
    <div><router-link to="/notifications">Notifications</router-link></div>
    <div><router-link to="/booknow/1">Book Now</router-link></div>
    <div><router-link to="/profile">My Appointments</router-link></div>
    <div class="relative">
      <router-link to="/booking_history">
        <div v-if="newAppoCount > 0" id="noti">
          {{ newAppoCount }}
        </div>
        Client Bookings
      </router-link>
    </div>
    <div>
      <router-link to="/canceled">
        <div v-if="newCanceledCount > 0" id="noti">
          {{ newCanceledCount }}
        </div>
        Canceled</router-link
      >
    </div>
    <div>
      <router-link to="/users">
        <div v-if="newUserCount > 0" id="noti">
          {{ newUserCount }}
        </div>
        Users</router-link
      >
    </div>
    <div><router-link to="/signup">Sign Up</router-link></div>
    <div><router-link to="/login">Log In</router-link></div>
    <div><router-link to="/services">Services</router-link></div>
    <div><router-link to="/employees">Employees</router-link></div>
    <div>
      <router-link :to="`/calendar/${getTodayUnixTime()}`"
        >Calendar</router-link
      >
    </div>
  </div>
</template>
<script>
// lib
import { watch, computed } from "vue";
import getTodayUnixTime from "@/lib/getTodayUnixTime";
import { connectSocket } from "./apis/connectSocket";
// pinia
import { useMyProfile, useNotificationCount } from "@/stores/myProfile";

export default {
  setup() {
    // pinia states
    const NCstore = useNotificationCount();
    const newAppoCount = computed(() => NCstore.newAppoCount);
    const newCanceledCount = computed(() => NCstore.newCanceledAppoCount);
    const newUserCount = computed(() => NCstore.newUserCount);

    // DEPENDENCIES
    const MPstore = useMyProfile();
    watch(
      () => MPstore.token,
      () => {
        // start connecting
        connectSocket();
      }
    );

    return {
      getTodayUnixTime,
      newAppoCount,
      newCanceledCount,
      newUserCount,
    };
  },
};
</script>


<style scoped>
#DrawerContent {
  display: flex;
  flex-direction: column;
  /* margin-inline: 20px; */
  box-sizing: border-box;
  text-align: center;
}

#DrawerContent a {
  padding: 12px;
  padding-inline: 5px;
  border-bottom: 1px solid var(--xtrans-gray);
  text-decoration: none;
  color: inherit;
  font-size: 17px;
  display: block;
  transition: all 0.5s ease-out; /* Smooth transition */
}
@media (orientation: portrait) {
  #DrawerContent a {
    padding-top: 16px;
    padding-bottom: 16px;
    font-size: 20px;
  }
}

#DrawerContent a:hover {
  background: var(--hover);
}
#DrawerContent a:active {
  background: var(--active);
}
#noti {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--trans-red);
  position: absolute;
  font-size: 13px;
  color: white;
  aspect-ratio: 1;
  border-radius: 10px;
  margin-left: calc(90% - 20px);
  width: 20px;
}
.relative {
  position: relative;
}
</style>
