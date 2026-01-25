<script setup lang="ts">
import { ref } from "vue";
import ItemCard from "../components/ItemCard.vue";
import { ProductDTO, ProductSchema } from "../schemas/ProductSchema";
import { z } from "zod";
// import { onMounted } from "vue";
import { useRouter } from "vue-router";

const search = ref("");
const searchInTitle = ref(true);
const searchInDescription = ref(true);

const minPrice = ref<number | null>(null);
const maxPrice = ref<number | null>(null);

const sortBy = ref<"date" | "price">("date");
const sortOrder = ref<"asc" | "desc">("desc");

const products = ref<ProductDTO[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const ProductListSchema = z.array(ProductSchema);


const router = useRouter();
const buildQuery = () => {
    const params = new URLSearchParams();

    if (search.value) params.append("search", search.value);
    params.append("searchInTitle", String(searchInTitle.value));
    params.append("searchInDescription", String(searchInDescription.value));

    if (minPrice.value !== null) params.append("minPrice", String(minPrice.value));
    if (maxPrice.value !== null) params.append("maxPrice", String(maxPrice.value));

    params.append("sortBy", sortBy.value);
    params.append("sortOrder", sortOrder.value);

    return params.toString();
};

const searchProducts = async () => {
    loading.value = true;
    error.value = null;

    try {
        const query = buildQuery();
        const res = await fetch(`http://localhost:3000/api/search/v2?${query}`);

        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }
        const json = await res.json();
        console.log("RAW API RESPONSE", JSON.stringify(json, null, 2));

        products.value = ProductListSchema.parse(json);
        console.log("testing", products.value);
    } catch (err) {
        console.error(err);
        error.value = "Could not load products";
    } finally {
        loading.value = false;
    }
};

const goToProduct = (id: number) => {
    router.push(`/product/${id}`);
}

// onMounted(() => {
//     searchProducts();
// });
</script>



<template>
    <div class="p-6 space-y-6">

        <div class="filter-bar">

            <input v-model="search" @keyup.enter="searchProducts" type="text" placeholder="Search products..."
                class="filter-search" />

            <label class="filter-check">
                <input type="checkbox" v-model="searchInTitle" />
                Title
            </label>
            <label class="filter-check">
                <input type="checkbox" v-model="searchInDescription" />
                Description
            </label>

            <input v-model.number="minPrice" type="number" placeholder="Min" class="filter-input" />
            <input v-model.number="maxPrice" type="number" placeholder="Max" class="filter-input" />

            <select v-model="sortBy" class="filter-input">
                <option value="date">Newest</option>
                <option value="price">Price</option>
            </select>

            <select v-model="sortOrder" class="filter-input">
                <option value="asc">↑</option>
                <option value="desc">↓</option>
            </select>

            <button @click="searchProducts" class="filter-button">
                Search
            </button>
        </div>
        <p v-if="loading">Loading…</p>
        <p v-if="error" class="text-red-600">{{ error }}</p>

        <div v-if="products.length" class="items-grid">
            <ItemCard v-for="product in products" :key="product.id" :title="product.title" :price="product.price"
                :image-url="product.images[0]" @click="goToProduct(product.id)" />
        </div>

        <p v-else-if="!loading">
            No products found
        </p>
    </div>

</template>
<style scoped>
.items-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
}

.filter-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    background: #f9fafb;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
}

.filter-search {
    flex: 1;
    min-width: 220px;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
}

.filter-input {
    width: 90px;
    padding: 0.45rem 0.6rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
}

.filter-check {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.875rem;
    white-space: nowrap;
}

.filter-button {
    padding: 0.5rem 0.9rem;
    background: #2563eb;
    color: white;
    border-radius: 6px;
    font-weight: 600;
}

.filter-button:hover {
    background: #1d4ed8;
}
</style>
