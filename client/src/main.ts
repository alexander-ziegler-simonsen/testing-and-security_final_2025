// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import './water.min.css'
import router from './router'
import { createPinia } from 'pinia';
import { useAuthStore } from './store/auth';
import { fetchMe } from './services/meService';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia)
app.mount('#app');

// hydrate auth on reload
const auth = useAuthStore();
const refreshToken = auth.getRefreshToken();

if (refreshToken) {
    fetchMe();
}