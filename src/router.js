// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Menu from "./views/Menu.vue";
import Profile from "./views/Profile.vue";
import NotFound from "./views/NotFound.vue";
import SignUp from "./views/authentication/SignUp.vue";
import LogIn from "./views/authentication/LogIn.vue";
import Refresh from "./components/Refresh.vue";
import Draft from "./templates/Draft.vue";
// services
import ServicesLayout from "./views/services/Layout.vue";
import Services from "./views/services/Services.vue";
import AddService from "./views/services/AddService.vue";
import AddCategory from "./views/services/AddCategory.vue";
import ServiceDetails from "./views/services/ServiceDetails.vue";
// employees
import EmployeesLayout from "./views/employees/Layout.vue";
import Employees from "./views/employees/Employees.vue";
import AddEmployee from "./views/employees/AddEmployee.vue";
import EmployeeDetails from "./views/employees/EmployeeDetails.vue";
// book now
import BookNowLayout from "./views/book_now/Layout.vue";
import SelectServices from "./views/book_now/comps/select_services/SelectServices.vue";
import SelectEmployees from "./views/book_now/comps/select_employees/SelectEmployees.vue";

const routes = [
  {
    path: "/",
    component: Menu,
  },
  {
    path: "/booknow",
    component: BookNowLayout,
    redirect: "/booknow/select_services",
    children: [
      {
        path: "select_services",
        component: SelectServices,
      },
      {
        path: "select_employees",
        component: SelectEmployees,
      },
    ],
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
        path: "add_service/:cate_id?",
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
  {
    path: "/employees",
    component: EmployeesLayout,
    redirect: "/employees/all",
    children: [
      {
        path: "all",
        component: Employees,
      },
      {
        path: "refresh",
        component: Refresh,
      },
      {
        path: "add_employee",
        component: AddEmployee,
      },
      {
        path: "details/:id",
        component: EmployeeDetails,
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
