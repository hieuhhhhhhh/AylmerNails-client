// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Menu from "./views/Menu.vue";
import BookNow from "./views/BookNow.vue";
import Profile from "./views/Profile.vue";
import NotFound from "./views/NotFound.vue";
import SignUp from "./views/authentication/SignUp.vue";
import LogIn from "./views/authentication/LogIn.vue";
import ServicesLayout from "./views/services/Layout.vue";
import Services from "./views/services/Services.vue";

import AddService from "./views/services/AddService.vue";
import AddCategory from "./views/services/AddCategory.vue";

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
  {
    path: "/services",
    component: ServicesLayout,
    redirect: "/services/all",
    children: [
      {
        path: "all",
        component: Services,
      },
      {
        path: "add_service",
        component: AddService,
      },
      {
        path: "add_category",
        component: AddCategory,
      },
    ],
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
