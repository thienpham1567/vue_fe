export const account = {
  path: "/account",
  children: [
    {
      path: "login",
      name: "Login",
      component: () => import("@/views/Login/Login.vue"),
    },
    {
      path: "register",
      name: "Register",
      component: () => import("@/views/Registration/Registration.vue"),
    },
  ],
};
