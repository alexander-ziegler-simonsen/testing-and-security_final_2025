<!-- src/pages/HomePage.vue -->
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">
      Welcome to the Vue Home Page 
    </h1>
    <button 
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      @click="increment"
    >
      Counter: {{ count }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const increment = () => (count.value++);
</script>

<style scoped>
</style>
