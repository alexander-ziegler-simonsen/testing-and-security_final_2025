<script setup lang="ts">
import { ref } from 'vue';
import ItemCard from '../components/ItemCard.vue';
import ProductPage from './ProductPage.vue';
const testImage = new URL( '../assets/images/testImage.jpg', import.meta.url).href;

import { ProductDTO } from '../schemas/ProductSchema';

const oneNewProduct: ProductDTO = {
  title: "test",
  price: 200,
  description: "test",
  images: [testImage, testImage, testImage]
}
const count = ref(0);
const increment = () => (count.value++);
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">
      Welcome to the Vue Home Page
    </h1>
    <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="increment">
      Counter: {{ count }}
    </button>
  </div>

  <div class="items-grid">
    <h1>product cards</h1>
    <ItemCard title="iphone" price="2000"
      :image-url="testImage" />
    <ItemCard title="car" price="20000"
      :image-url="testImage" />
    <ItemCard title="xbox one" price="2000"
      :image-url="testImage" />
    <ItemCard title="stol" price="100"
      :image-url="testImage" />
    <ItemCard title="bærbar" price="200"
      :image-url="testImage" />
    <ItemCard title="hus" price="100000"
      :image-url="testImage" />
    <ItemCard title="taske" price="20"
      :image-url="testImage" />

  </div>
  <div>
    <ProductPage :product="oneNewProduct" />
  </div>
</template>

<style scoped>
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}
</style>
