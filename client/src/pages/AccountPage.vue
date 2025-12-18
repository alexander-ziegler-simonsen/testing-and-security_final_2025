<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import ItemCard from "../components/ItemCard.vue";
import { ProductDTO, ProductSchema } from "../schemas/ProductSchema";
import { z } from "zod";

const auth = useAuthStore();
const router = useRouter();

const products = ref<ProductDTO[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const ProductListSchema = z.array(ProductSchema);

const fetchMyProducts = async () => {
    try {
        loading.value = true;
        error.value = null;

        console.log("auth", auth.accessToken);

        const res = await fetch("http://localhost:3000/api/products/my", {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        });

        if (!res.ok) {
            throw new Error("Failed to load products");
        }

        const json = await res.json();
        products.value = ProductListSchema.parse(json);
    } catch (err) {
        console.error(err);
        error.value = "Could not load your products";
    } finally {
        loading.value = false;
    }
};

const goToProduct = (id: number) => {
    router.push(`/product/${id}`);
};

onMounted(fetchMyProducts);
</script>

<template>
    <div class="account-page">
        <h1 class="title">My products</h1>

        <p v-if="loading">Loading…</p>
        <p v-if="error" class="error">{{ error }}</p>

        <div v-if="!loading && !products.length" class="empty">
            You have not listed any products yet.
        </div>

        <div v-if="products.length" class="items-grid">
            <ItemCard v-for="product in products" :key="product.id" :title="product.title" :price="product.price"
                :image-url="product.images[0]" @click="goToProduct(product.id)" />
        </div>
    </div>
</template>

<style scoped>
.account-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
}

.title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
}

.error {
    color: #dc2626;
    margin-bottom: 1rem;
}

.empty {
    padding: 2rem;
    text-align: center;
    color: #6b7280;
    background: #f9fafb;
    border-radius: 8px;
}

.items-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

@media (max-width: 768px) {
    .items-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .items-grid {
        grid-template-columns: 1fr;
    }
}
</style>
