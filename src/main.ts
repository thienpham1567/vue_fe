import { createApp } from "vue";
import router from "@/router";
import App from "@/App.vue";
import PrimeVue from "primevue/config";
import { VueQueryPlugin } from "@tanstack/vue-query";
import pinia from "@/store";
import "@/styles/global.scss";
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue);
app.use(VueQueryPlugin);
app.use(pinia);
app.use(router);

router.isReady().then(() => {
  app.mount("#app");
});
