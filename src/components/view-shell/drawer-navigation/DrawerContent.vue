<template>
  <div id="DrawerContent">
    <div><router-link to="/">Menu</router-link></div>
    <div><router-link to="/booknow">Book Now</router-link></div>
    <div><router-link to="/profile">My Appointments</router-link></div>
    <div><router-link to="/signup">Sign Up</router-link></div>
    <div><router-link to="/login">Log In</router-link></div>
    <div><router-link to="/services">Services</router-link></div>
    <div><router-link to="/employees">Employees</router-link></div>
    <div>
      <router-link :to="`/calendar/${getToday()}`">Calendar</router-link>
    </div>
  </div>
</template>
<script>
import getTodayUnixTime from "@/lib/getTodayUnixTime";

export default {
  methods: {
    getToday() {
      return getTodayUnixTime();
    },
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
    padding: 16px;
    font-size: 20px;
  }
}

#DrawerContent a:hover {
  background: var(--hover);
}
#DrawerContent a:active {
  background: var(--active);
}
</style>
