import Layout from '@/layout/CustomerLayout.vue';

export const paypal = {
  path: "/payment/paypal",
  component: Layout,
  children: [
    {
      path: "",
      name: "Payment",
      component: () => import("@/views/Paypal/Paypal.vue"),
    }
  ],
};
