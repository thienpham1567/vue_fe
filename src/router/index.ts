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
import { checkout } from "./checkout";
import { account } from "./account";

const routes: Array<RouteRecordRaw> = [home, product, account, cart, checkout];

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

export default router;
