import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from "vue-router";

// Routes
import { product } from "./product";
import { home } from "./home";
import { cart } from "./cart";
import { account } from "./account";
import { admin } from "./admin"
import { checkout } from "./checkout";

const routes: Array<RouteRecordRaw> = [home, product, cart, account, admin, checkout];

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

export default router;
