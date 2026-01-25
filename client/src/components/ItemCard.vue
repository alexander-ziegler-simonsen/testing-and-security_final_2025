<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    title: string;
    price: number | string;
    imageUrl: string;
}>();

const API_BASE_URL = "http://localhost:3000";

const resolvedImageUrl = computed(() => {
    if (!props.imageUrl) 
    {
        return "/placeholder.png";
    }
    if (props.imageUrl.startsWith("http")) 
    {
        return props.imageUrl;
    }
    
    return `${API_BASE_URL}${props.imageUrl}`;
});
</script>

<template>
    <div class="item-card">
        <h3 class="title">{{ title }}</h3>

        <div class="image-wrapper">
            <img :src="resolvedImageUrl" :alt="title" />
        </div>

        <div class="price">{{ price }} kr</div>
    </div>
</template>

<style scoped>
/* CARD */
.item-card {
    width: 180px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #ffffff;
    overflow: hidden;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.item-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* TITLE */
.title {
    font-size: 16px;
    font-weight: 600;
    padding: 6px 8px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* IMAGE */
.image-wrapper {
    width: 100%;
    height: 120px;
    background: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-wrapper img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
}

/* PRICE */
.price {
    padding: 6px 8px;
    text-align: right;
    font-weight: 700;
    font-size: 14px;
    color: #16a34a;
}
</style>
