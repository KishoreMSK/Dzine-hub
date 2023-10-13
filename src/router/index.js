import { createWebHistory, createRouter } from "vue-router";
import LoginComponent from '../components/LoginComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
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
      }
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;