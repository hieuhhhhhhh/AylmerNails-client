// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Menu from "./views/Menu.vue";
import BookNow from "./views/BookNow.vue";
import Profile from "./views/Profile.vue";
import NotFound from "./views/NotFound.vue";
import SignUp from "./views/authentication/SignUp.vue";
import LogIn from "./views/authentication/LogIn.vue";

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
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/login",
    component: LogIn,
  },
  // wildcard route for 404 - not found
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
