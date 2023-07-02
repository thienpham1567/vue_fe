import Layout from '@/layout/CustomerLayout.vue';

export const myaccount = {
    path: '/myaccount',
    component: Layout,
    children: [
        {
            path: '',
            name: "myaccount",
            component: () => import("@/views/MyAccount/AccountOverview.vue"),
        },
        {
            path: 'view-order',
            name: 'view-order',
            component: () => import("@/views/MyAccount/ViewOrders.vue"),
        },
    ]
}
