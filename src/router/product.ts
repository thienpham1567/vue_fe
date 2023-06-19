import Layout from '@/layout/CustomerLayout.vue';

export const product = {
  path: "/products",
  component: Layout,
  children: [
    {
      path: "",
      name: "Products",
      component: () => import("@/views/ProductList/ProductList.vue"),
    },
    {
      path: ":productId(\\d+)",
      name: "Product",
      component: () => import("@/components/Product/Product.vue"),
    },
    {
      path: "productDetail",
      name: "ProductDetail",
      component: () => import("@/views/ProductDetail/ProductDetail.vue"),
    },
    {
      path: "productList",
      name: "ProductList",
      component: () => import("@/views/ProductList/ProductList.vue"),
    },
  ],
};
