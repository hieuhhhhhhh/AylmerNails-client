// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Menu from "./views/Menu.vue";
import BookNow from "./views/BookNow.vue";
import Profile from "./views/Profile.vue";
import NotFound from "./views/NotFound.vue"; // Import the NotFound component

const routes = [
  {
    path: "/",
    component: Menu,
  },
  {
    path: "/booknow",
    component: BookNow,
  },
  {
    path: "/profile",
    component: Profile,
  },
  // Add the wildcard route for handling 404 errors
  {
    path: "/:pathMatch(.*)*", // This matches any undefined route
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
