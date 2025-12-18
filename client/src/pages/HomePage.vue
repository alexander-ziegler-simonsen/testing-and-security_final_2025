<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ItemCard from "../components/ItemCard.vue";
import { ProductSchema, ProductDTO } from "../schemas/ProductSchema";
import { z } from "zod";

const products = ref<ProductDTO[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const router = useRouter();
const ProductListSchema = z.array(ProductSchema);

const pickRandom = (items: ProductDTO[], count: number) => {
    return [...items]
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
};

const fetchRandomProducts = async () => {
    try {
        loading.value = true;
        error.value = null;

        const res = await fetch(
            "http://localhost:3000/api/search/v2?sortBy=date&sortOrder=desc"
        );

        if (!res.ok) {
            throw new Error("Failed to load products");
        }

        const json = await res.json();
        const allProducts = ProductListSchema.parse(json);

        products.value = pickRandom(allProducts, 3);
    } catch (err) {
        console.error(err);
        error.value = "Could not load products";
    } finally {
        loading.value = false;
    }
};

const goToProduct = (id: number) => {
    router.push(`/product/${id}`);
};

onMounted(fetchRandomProducts);
</script>

<template>
  <div class="p-6 space-y-4">
    <h2 class="text-xl font-semibold">
      Featured items
    </h2>

    <p v-if="loading">Loading…</p>
    <p v-if="error" class="text-red-600">{{ error }}</p>

    <div v-if="products.length" class="items-grid">
      <ItemCard
        v-for="product in products"
        :key="product.id"
        :title="product.title"
        :price="product.price"
        :image-url="product.images[0]"
        @click="goToProduct(product.id)"
      />
    </div>

    <p v-else-if="!loading">
      No products available right now.
    </p>
  </div>
</template>


<style scoped>
.items-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* exactly 3 columns */
  gap: 24px;
  width: 100%;
}
</style>
