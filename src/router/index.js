import { createWebHistory, createRouter } from "vue-router";
import LoginComponent from "../components/LoginComponent.vue";
import RegisterComponent from "../components/RegisterComponent.vue";
import UserComponent from "../components/UserComponent.vue";
const routes = [
  {
    path: "/",
    name: "LoginComponent",
    component: LoginComponent,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = JSON.parse(sessionStorage.getItem("isAuth"))
      if (!isAuthenticated) {
        next();
      } else {
        next({ name: "UserComponent" });
      }
    },
  },
  {
    path: "/register",
    name: "RegisterComponent",
    component: RegisterComponent,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = JSON.parse(sessionStorage.getItem("isAuth"));
      if (!isAuthenticated) {
        next();
      } else {
        next({ name: "UserComponent" });
      }
    },
  },
  {
    path: "/users",
    name: "UserComponent",
    component: UserComponent,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = JSON.parse(sessionStorage.getItem("isAuth"));
      if (isAuthenticated) {
        next();
      } else {
        next({ name: "LoginComponent" });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
