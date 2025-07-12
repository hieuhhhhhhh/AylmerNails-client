import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("./views/Welcome.vue"),
  },
  {
    path: "/refresh",
    component: () => import("./components/Refresh.vue"),
  },
  {
    path: "/activities",
    component: () => import("./views/activities/Layout.vue"),
    children: [
      {
        path: "booking",
        component: () => import("./views/activities/Booking.vue"),
      },
      {
        path: "canceled",
        component: () => import("./views/activities/Canceled.vue"),
      },
      {
        path: "saved",
        component: () => import("./views/activities/Saved.vue"),
      },
    ],
  },
  {
    path: "/booknow/:page?",
    component: () => import("./views/book_now/Parent.vue"),
  },
  {
    path: "/profile",
    component: () => import("./views/profile/Layout.vue"),
  },
  {
    path: "/users",
    component: () => import("./views/users/Layout.vue"),
    children: [
      {
        path: "accounts",
        component: () => import("./views/users/Users.vue"),
      },
      {
        path: ":userId",
        component: () => import("./views/users/User.vue"),
      },
      {
        path: "clients",
        component: () => import("./views/users/Clients.vue"),
      },
      {
        path: "blacklist",
        component: () => import("./views/users/Blacklist.vue"),
      },
    ],
  },
  {
    path: "/business_links",
    component: () => import("./views/business_links/Layout.vue"),
  },
  {
    path: "/signup",
    component: () => import("./views/authentication/sign_up/SignUp.vue"),
  },
  {
    path: "/create_account",
    component: () =>
      import("./views/authentication/create_account/CreateAccount.vue"),
  },
  {
    path: "/forgot_password",
    component: () =>
      import("./views/authentication/forgot_password/ForgotPassword.vue"),
  },
  {
    path: "/login",
    component: () => import("./views/authentication/LogIn.vue"),
  },
  {
    path: "/draft",
    component: () => import("./templates/Draft.vue"),
  },
  {
    path: "/services",
    component: () => import("./views/services/Layout.vue"),
    redirect: "/services/all",
    children: [
      {
        path: "all",
        component: () => import("./views/services/Services.vue"),
      },
      {
        path: "refresh",
        component: () => import("./components/Refresh.vue"),
      },
      {
        path: "add_service/:cate_id?",
        component: () => import("./views/services/AddService.vue"),
      },
      {
        path: "add_category",
        component: () => import("./views/services/AddCategory.vue"),
      },
      {
        path: "details/:id",
        component: () => import("./views/services/ServiceDetails.vue"),
      },
    ],
  },
  {
    path: "/employees",
    component: () => import("./views/employees/Layout.vue"),
    redirect: "/employees/all",
    children: [
      {
        path: "all",
        component: () => import("./views/employees/Employees.vue"),
      },
      {
        path: "refresh",
        component: () => import("./components/Refresh.vue"),
      },
      {
        path: "add_employee",
        component: () => import("./views/employees/AddEmployee.vue"),
      },
      {
        path: "details/:id",
        component: () => import("./views/employees/EmployeeDetails.vue"),
      },
    ],
  },
  {
    path: "/calendar/:unixDate/:appoId?",
    component: () => import("./views/calendar/Calendar.vue"),
    children: [{ path: "selecting" }],
  },
  {
    path: "/conflicts",
    component: () => import("./views/conflicts/Layout.vue"),
    children: [
      {
        path: "service_ld/:serviceId",
        component: () => import("./views/conflicts/ServiceLDconflicts.vue"),
      },
      {
        path: "service_duration/:serviceId",
        component: () => import("./views/conflicts/DurationConflicts.vue"),
      },
      {
        path: "employee_ld/:empId",
        component: () => import("./views/conflicts/EmployeeLDconflicts.vue"),
      },
      {
        path: "schedule/:empId",
        component: () => import("./views/conflicts/ScheduleConflicts.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("./views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
