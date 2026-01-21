import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import About from '../pages/AboutPage.vue'
import Login from '../pages/LoginPage.vue'
import NewUser from '../pages/CreateUserPage.vue'
import SearchPage from '../pages/SearchPage.vue'

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/about', name: 'About', component: About },
    { path: '/login', name: 'Login', component: Login },
    { path: '/create_user', name: 'New user', component: NewUser },
    { path: '/search', name: 'Search', component: SearchPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
