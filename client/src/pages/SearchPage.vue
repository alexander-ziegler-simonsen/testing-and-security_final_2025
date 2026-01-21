
<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const searchTerm = computed(() => {
    return (route.query.q as string) || ''
})

watch(searchTerm, (newValue) => {
    if (newValue) {
        console.log('Search changed to:', newValue)
        // fetch results again here
    }
})

onMounted(() => {
    if (searchTerm.value) {
        console.log('Initial search:', searchTerm.value)
    }
})
</script>

<template>
    <div>
        <h1>Search Page</h1>

        <p v-if="searchTerm">
            You searched for:
            <strong>{{ searchTerm }}</strong>
        </p>

        <p v-else>
            No search term provided
        </p>
    </div>
</template>
