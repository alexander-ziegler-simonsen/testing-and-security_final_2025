<script setup lang="ts">
    import { RouterLink } from 'vue-router'
</script>




<template>
    <header class="navbar">
        <nav class="nav-links">
            <RouterLink to="/">Dashboard</RouterLink>
            <RouterLink to="/products">Products</RouterLink>
            <RouterLink to="/users">Users</RouterLink>
            <RouterLink to="/settings">Settings</RouterLink>
        </nav>

        <h1 class="logo">Trade-IT (admin)</h1>
    </header>
</template>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem 1.5rem;
    background: #a4d7f5;
    box-shadow:  0 2px 1px #949494;
    
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