import Layout from '@/layout/CustomerLayout.vue';

export const favorite = {
    path: "/favorite",
    component: Layout,
    children: [
        {
            path: "",
            name: "favorite",
            component: () => import("@/views/Like/Favorite.vue"),
        },
    ],
};