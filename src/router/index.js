import { createWebHistory, createRouter } from "vue-router";
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
import UserComponent from '../components/UserComponent.vue'
const routes = [
    {
      path: "/",
      name: "LoginComponent",
      component: LoginComponent,
    },
    {
        path: "/register",
        name: "RegisterComponent",
        component: RegisterComponent,
      },
      {
        path: "/users",
        name: "UserComponent",
        component: UserComponent,
      }
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;