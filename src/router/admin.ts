import { useAccountStore } from '@/store';
import Admin from "@/views/Admin/Admin.vue";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";


export const admin = {
  path: "/admin",
  component: Admin,
  meta: {
    requiresAuth: true
  },
  children: [
    // {
    //   path: 'brands',
    //   name:"BrandAdmin",
    //   component: () => import("@/components/Admin/Brand/BrandTable.vue"),
    // },
    // {
    //   path: 'categories',
    //   name:"CategoryAdmin",
    //   component: () => import("@/components/Admin/Category/CategoryTable.vue"),
    // },
    // {
    //   path: 'products',
    //   name:"ProductAdmin",
    //   component: () => import("@/components/Admin/Product/ProductTable.vue"),
    // },
    // {
    //   path: 'users',
    //   name:"UserAdmin",
    //   component: () => import("@/components/Admin/User/UserTable.vue"),
    // },
    // {
    //   path: 'orders',
    //   name:"OrderAdmin",
    //   component: () => import("@/components/Admin/Order/Order.vue"),
    // },
  ]
  ,
  // 
  
};
