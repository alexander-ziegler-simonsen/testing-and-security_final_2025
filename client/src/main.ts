// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import './water.min.css'
import router from './router'
import { createPinia } from 'pinia';

createApp(App)
    .use(router)    
    .use(createPinia())
    .mount('#app');
