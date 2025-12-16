<script setup lang="ts">
import { useAuthStore } from '../store/auth';

const auth = useAuthStore();

function logout() {
    auth.clearAuth();
}
</script>

<template>
    <button @click="logout">
        Logout
    </button>
</template>