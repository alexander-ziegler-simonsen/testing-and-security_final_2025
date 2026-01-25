<script setup lang="ts">
import { computed } from "vue";
import { ProductSchema, ProductDTO } from "../schemas/ProductSchema";
import ImageSlider from "../components/ImageSlider.vue";

// props
const props = defineProps<{
    product: ProductDTO;
}>();

// runtime validation 
ProductSchema.parse(props.product);

// computed helpers
const formattedPrice = computed(() =>
    new Intl.NumberFormat("da-DK", {
        style: "currency",
        currency: "DKK",
    }).format(props.product.price)
);

</script>

<template>
    <div class="product-page">
        <h1 class="title">{{ product.title }}</h1>
        <ImageSlider :images="product.images" />
        <p class="description">{{ product.description }}</p>
        <div class="price">{{ formattedPrice }}</div>
    </div>
</template>

<style scoped>
.product-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem;
}

.title {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.images {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    margin-bottom: 1rem;
}

.images img {
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
}

.description {
    font-size: 1rem;
    margin-bottom: 1rem;
}

.price {
    font-size: 1.5rem;
    font-weight: bold;
}
</style>
