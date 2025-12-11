import { createApp } from 'vue'
import './water.min.css'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
