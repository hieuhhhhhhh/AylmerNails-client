// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Menu from "./views/Menu.vue";
import BookNow from "./views/BookNow.vue";
import Profile from "./views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "menu",
    component: Menu,
  },
  {
    path: "/booknow",
    name: "booknow",
    component: BookNow,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
