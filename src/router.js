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
import Refresh from "./components/Refresh.vue";
import AddService from "./views/services/AddService.vue";
import AddCategory from "./views/services/AddCategory.vue";
import ServiceDetails from "./views/services/ServiceDetails.vue";
import Draft from "./templates/Draft.vue";

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
    path: "/draft",
    component: Draft,
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
        path: "refresh",
        component: Refresh,
      },
      {
        path: "add_service",
        component: AddService,
      },
      {
        path: "add_category",
        component: AddCategory,
      },
      {
        path: "details/:id",
        component: ServiceDetails,
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
