import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from "primevue/button"
import LoadScript from "vue-plugin-load-script";

const app = createApp(App)
app.component('Button', Button);
app.use(LoadScript);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.use(router)
app.mount('#app')
