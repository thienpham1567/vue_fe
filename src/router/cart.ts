import Layout from '@/layout/CustomerLayout.vue';

export const cart = {
  path: "/",
  component: Layout,
  children: [
    {
      path: "cart",
      name: "cart",
      component: () => import("@/views/Cart/Cart.vue"),
    },
  ],
};
