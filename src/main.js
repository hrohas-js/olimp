import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';
import Croppa from 'vue-croppa';
import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-teal/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "element-plus/dist/index.css";
import 'vue-croppa/dist/vue-croppa.css';

createApp(App).use(createPinia()).use(router).use(PrimeVue).use(Croppa).mount('#app')
