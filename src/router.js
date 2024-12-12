// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomeV.vue";
import About from "./views/AboutV.vue";
import Contact from "./views/ContactV.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
