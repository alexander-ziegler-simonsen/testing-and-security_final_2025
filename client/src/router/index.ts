import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import About from '../pages/AboutPage.vue'
import Login from '../pages/LoginPage.vue'
import NewUser from '../pages/CreateUserPage.vue'

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/about', name: 'About', component: About },
    { path: '/login', name: 'Login', component: Login },
    { path: '/create_user', name: 'New user', component: NewUser }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
