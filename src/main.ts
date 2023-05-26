import { createApp } from 'vue'
import '@/styles/global.scss'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from 'pinia';
import "primevue/resources/themes/lara-light-indigo/theme.css";     
import "primevue/resources/primevue.min.css";

const app = createApp(App);
const pinia = createPinia();
app.use(PrimeVue);
app.use(VueQueryPlugin)
app.use(pinia);
app.mount('#app');
