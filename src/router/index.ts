import {
  createRouter,
  createWebHistory,
  type Router,
  type RouteRecordRaw,
} from "vue-router";

// Routes
import { cart } from "./cart";
import { product } from "./product";
import { home } from "./home";
import { checkout } from "./checkout";
import { account } from "./account";
import { admin } from "./admin";
import { myaccount } from "./myaccount";

const routes: Array<RouteRecordRaw> = [home, product, account, cart, checkout, admin, myaccount];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});


export default router;
