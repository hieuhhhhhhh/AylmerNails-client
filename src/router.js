// src/router.js
import { createRouter, createWebHistory } from "vue-router";
import Menu from "./views/Menu.vue";
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
import BookNow from "./views/book_now/Parent.vue";
// calendar
import Calendar from "./views/calendar/Calendar.vue";
// conflicts
import ConflictsLayout from "./views/conflicts/Layout.vue";
import ServiceLDconflicts from "./views/conflicts/ServiceLDconflicts.vue";
import DurationConflicts from "./views/conflicts/DurationConflicts.vue";
import EmployeeLDconflicts from "./views/conflicts/EmployeeLDconflicts.vue";
import ScheduleConflicts from "./views/conflicts/ScheduleConflicts.vue";

// booking history
import BookingHistory from "./views/booking_history/Layout.vue";
// profile
import Profile from "./views/profile/Layout.vue";
// business links
import BusinessLinks from "./views/business_links/Layout.vue";
// users
import UsersLayout from "./views/users/Layout.vue";
// import Users from "./views/users/Users.vue";
// import User from "./views/users/User.vue";
// canceled
import Canceled from "./views/canceled/Layout.vue";
// activities
import Activities from "./views/activities/Layout.vue";
import Booking from "./views/activities/Booking.vue";

const routes = [
  {
    path: "/",
    component: Menu,
  },
  {
    path: "/refresh",
    component: Refresh,
  },
  {
    path: "/activities",
    component: Activities,
    children: [
      {
        path: "booking",
        component: Booking,
      },
      {
        path: "canceled",
        component: Canceled,
      },
    ],
  },

  {
    path: "/booknow/:page?",
    component: BookNow,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/users",
    component: UsersLayout,
  },
  // {
  //   path: "/accounts",
  //   component: UsersLayout,
  //   children: [
  //     {
  //       path: "",
  //       component: Users,
  //     },
  //     {
  //       path: ":userId",
  //       component: User,
  //     },
  //   ],
  // },
  {
    path: "/canceled",
    component: Canceled,
  },
  {
    path: "/business_links",
    component: BusinessLinks,
  },
  {
    path: "/booking_history",
    component: BookingHistory,
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

  {
    path: "/calendar/:unixDate/:appoId?",
    component: Calendar,
    children: [{ path: "selecting" }],
  },

  {
    path: "/conflicts",
    component: ConflictsLayout,
    children: [
      {
        path: "service_ld/:serviceId",
        component: ServiceLDconflicts,
      },
      {
        path: "service_duration/:serviceId",
        component: DurationConflicts,
      },
      {
        path: "employee_ld/:empId",
        component: EmployeeLDconflicts,
      },
      {
        path: "schedule/:empId",
        component: ScheduleConflicts,
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
