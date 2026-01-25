<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import LogoutButton from "./LogoutButton.vue";
import { useAuthStore } from "../store/auth";

const search = ref('');
const router = useRouter();
const auth = useAuthStore();


function onSearch() {
    if (!search.value.trim()) return;
    router.push({
        path: '/search',
        query: { q: search.value }
    })
}
</script>

<template>
    <header class="navbar">
        <h1 class="logo">Trade-IT</h1>

        <form @submit.prevent="onSearch">
            <input v-model="search" type="text" placeholder="Search..." />
            <button type="submit">
                Search
            </button>
        </form>
        <nav class="nav-links">
            <RouterLink to="/">Dashboard</RouterLink>
            <RouterLink to="/about">About</RouterLink>
            <RouterLink to="/login">Login</RouterLink>
        </nav>
    </header>
    <div>
        <LogoutButton v-if="auth.isAuthenticated" />
    </div>
</template>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem 1.5rem;
    background: #f5f5f5;
    box-shadow: 0 2px 1px #949494;

    border-radius: 3px;
}

/* Logo styling */
.logo {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
}

/* Navigation layout */
.nav-links {
    display: flex;
    gap: 1.2rem;
}

.nav-links a {
    color: #333;
    text-decoration: underline 3px;
    text-underline-offset: 6px;
    font-weight: 500;
    transition: color 0.2s ease;
}

.nav-links a:hover {
    color: #0078ff;
}

/* Optional: Active route styling */
.router-link-active {
    color: #0078ff;
    font-weight: 600;
}
</style>
