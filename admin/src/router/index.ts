import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../pages/Dashboard.vue'
import Users from '../pages/Users.vue'
import Products from '../pages/Products.vue'
import Settings from '../pages/Settings.vue'

const routes = [
    { path: '/', name: 'dashboard', component: Dashboard },
    { path: '/users', name: 'users', component: Users },
    { path: '/products', name: 'products', component: Products },
    { path: '/settings', name: 'settings', component: Settings },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
