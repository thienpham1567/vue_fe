import Admin from "@/layout/AdminLayout.vue";
// import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const admin = {
  path: "/admin",
  component: Admin,
  // meta: {
  //   requiresAuth: true,
  // },
  children: [
    {
      path: "dashboard",
      name: "DashboardAdmin",
      component: () => import("@/views/Admin/Dashboard.vue"),
    },
    {
      path: "brands",
      name: "BrandAdmin",
      component: () => import("@/views/Admin/Brand.vue"),
    },
    {
      path: "categories",
      name: "CategoryAdmin",
      component: () => import("@/views/Admin/Category.vue"),
    },
    {
      path: "products",
      name: "ProductAdmin",
      component: () => import("@/views/Admin/Product.vue"),
    },
    {
      path: "accounts",
      name: "AccountManagement",
      component: () => import("@/views/Admin/Account.vue"),
    },
    {
      path: "orders",
      name: "OrderAdmin",
      component: () => import("@/views/Admin/Order.vue"),
    },
    {
      path: "report",
      name: "ReportAdmin",
      component: () => import("@/views/Admin/Report.vue"),
    },
  ],
  // beforeEnter: (
  //   _to: RouteLocationNormalized,
  //   _from: RouteLocationNormalized,
  //   next: NavigationGuardNext
  // ) => {
  //   const { getToken, getUser } = useAccountStore();
  //   if (
  //     _to.meta.requiresAuth &&
  //     getToken.value &&
  //     getUser.value?.roles?.some((role) => role === "AD")
  //   ) {
  //     next();
  //   } else {
  //     next({ name: "Home" });
  //   }
  // },
};
