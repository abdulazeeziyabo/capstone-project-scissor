import './assets/main.css'
import 'vue3-toastify/dist/index.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue';
import {Firebase} from "./utils/firebase"
import router from './router'


const pinia = createPinia()
const app = createApp(App)
app.use(router);
app.use(pinia);
app.use(Firebase);
app.mount('#app');
