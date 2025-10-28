import { createRouter, createWebHistory } from "vue-router";
import { STORAGE_KEYS } from "../utils/constants";
import Landing from "../pages/Landing.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Dashboard from "../pages/Dashboard.vue";
import Tickets from "../pages/Tickets.vue";

// Example authentication guard
function requireAuth(to, from, next) {
  const isAuthenticated = localStorage.getItem(STORAGE_KEYS.SESSION);
  if (isAuthenticated) {
    next();
  } else {
    next("/auth/login");
  }
}

const routes = [
  { path: "/", component: Landing },
  { path: "/auth/login", component: Login },
  { path: "/auth/register", component: Register },
  { path: "/dashboard", component: Dashboard, beforeEnter: requireAuth },
  { path: "/tickets", component: Tickets, beforeEnter: requireAuth },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
