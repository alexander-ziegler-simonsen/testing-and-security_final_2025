// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';

import { router } from './router/index';
import { createPinia } from 'pinia';

import { VueQueryPlugin } from '@tanstack/vue-query';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);

app.mount('#app');
