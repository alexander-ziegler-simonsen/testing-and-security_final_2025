<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ItemCard from "../components/ItemCard.vue";
import { ProductCardDTO, ProductCardSchema } from "../schemas/ProductSchema";
import { z } from "zod";
import { productService } from "../services/productService";

const products = ref<ProductCardDTO[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const router = useRouter();
//const ProductListSchema = z.array(ProductSearchSchema);
const ProductCardListSchema = z.array(ProductCardSchema);


const getRandomProducts = async () => {
    try {
        loading.value = true;
        error.value = null;

        const res = await productService.fetchRandomProducts();

        if (!res) {
            throw new Error("Failed to load products");
        }

        const allProducts = ProductCardListSchema.parse(res);

        products.value = allProducts;
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

onMounted(getRandomProducts);
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
        :image-url="product.url"
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
