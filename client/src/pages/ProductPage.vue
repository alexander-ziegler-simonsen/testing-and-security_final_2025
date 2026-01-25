<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ProductSchema, ProductDTO } from "../schemas/ProductSchema";
import ImageSlider from "../components/ImageSlider.vue";

const route = useRoute();
const product = ref<ProductDTO | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const API_BASE_URL = "http://localhost:3000";

const resolvedImages = computed(() => {
    if (!product.value) return [];
    return product.value.images.map((img) =>
        img.startsWith("http") ? img : `${API_BASE_URL}${img}`
    );
});

const productId = computed(() => Number(route.params.id));

const formattedPrice = computed(() => {
    if (!product.value) return "";
    return new Intl.NumberFormat("da-DK", {
        style: "currency",
        currency: "DKK",
    }).format(product.value.price);
});

const fetchProduct = async () => {
    try {
        loading.value = true;
        error.value = null;

        const res = await fetch(
            `http://localhost:3000/api/products/${productId.value}`
        );

        console.log("product", productId);

        if (!res.ok) {
            throw new Error("Product not found");
        }

        const json = await res.json();

        // runtime validation
        product.value = ProductSchema.parse(json);
    } catch (err) {
        console.error(err);
        error.value = "Could not load product";
    } finally {
        loading.value = false;
    }
};

onMounted(fetchProduct);
</script>

<template>
    <div class="product-page">
        <p v-if="loading">Loading…</p>
        <p v-if="error" class="error">{{ error }}</p>

        <template v-if="product">
            <h1 class="title">{{ product.title }}</h1>
            <ImageSlider :images="resolvedImages" />
            <p class="description">{{ product.description }}</p>
            <div class="price">{{ formattedPrice }}</div>
        </template>
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
