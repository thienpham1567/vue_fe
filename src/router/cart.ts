import Layout from '@/layout/CustomerLayout.vue';

export const cart = {
  path: "/products",
  component: Layout,
  children: [
    {
      path: "cart",
      name: "cart",
      component: () => import("@/views/Cart/Cart.vue"),
    },
  ],
};
