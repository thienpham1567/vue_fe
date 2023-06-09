import Admin from "@/layout/AdminLayout.vue";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import jwt_decode from "jwt-decode";



export const admin = {
  path: "/admin",
  component: Admin,
  meta: {
    requiresAuth: true,
  },
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
      path: "/products",
      name: "ProductsAdmin",
      component: () => import("@/views/Admin/Product.vue"),
    },
    {
      path: "/products/variation",
      name: "ProductsVariation",
      component: () => import("@/views/Admin/ProductVariation.vue"),
    },
    {
      path: "/products/variation-size",
      name: "ProductsVariationSize",
      component: () => import("@/views/Admin/ProductsVariationSizes.vue"),
    },
    {
      path: "/products/image",
      name: "ProductsImage",
      component: () => import("@/views/Admin/ProductsImages.vue"),
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
    {
      path: "review",
      name: "ReviewAdmin",
      component: () => import("@/views/Admin/Review.vue"),
    },
  ],
  beforeEnter: (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const token = localStorage.getItem('token');
    if (token) {
      const valueToken = jwt_decode(token);
      const roles = valueToken.user.roles;
      const isAdmin = roles.some(role => role.authority === 'ADMIN');
      if (_to.meta.requiresAuth && isAdmin) {
        next();
      } else {
        next({ name: 'Home' });
      }
    } else {
      next({ name: 'Login' });
    }
  },
};
