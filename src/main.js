import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';
import Croppa from 'vue-croppa';
import VueEasyLightbox from 'vue-easy-lightbox';
import { createYmaps } from 'vue-yandex-maps';
import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-teal/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "element-plus/dist/index.css";
import 'vue-croppa/dist/vue-croppa.css';

createApp(App)
    .use(createPinia())
    .use(router)
    .use(PrimeVue)
    .use(Croppa)
    .use(VueEasyLightbox)
    .use(createYmaps({
    apikey: '76cfed62-af40-4762-8407-089b55cdeec6',
})).mount('#app')
