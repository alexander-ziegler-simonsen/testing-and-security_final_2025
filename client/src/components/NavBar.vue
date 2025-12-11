<script setup lang="ts">
    import { RouterLink } from 'vue-router'
</script>

<template>
    <nav style="display: flex; gap: 1rem; padding: 1rem; background: #f5f5f5;">
        <RouterLink to="/">Dashboard</RouterLink>
        <RouterLink to="/about">About</RouterLink>
    </nav>
</template>