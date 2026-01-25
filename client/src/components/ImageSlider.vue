<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    images: string[];
}>();

const currentIndex = ref(0);
let startX = 0;

const next = () => {
    currentIndex.value =
        (currentIndex.value + 1) % props.images.length;
};

const prev = () => {
    currentIndex.value =
        (currentIndex.value - 1 + props.images.length) % props.images.length;
};

// touch / mouse swipe
const onStart = (e: TouchEvent | MouseEvent) => {
    startX = "touches" in e ? e.touches[0].clientX : e.clientX;
};

const onEnd = (e: TouchEvent | MouseEvent) => {
    const endX =
        "changedTouches" in e
            ? e.changedTouches[0].clientX
            : e.clientX;

    const diff = startX - endX;

    if (diff > 50) next();
    if (diff < -50) prev();
};
</script>

<template>
    <div class="slider" @touchstart="onStart" @touchend="onEnd" @mousedown="onStart" @mouseup="onEnd">
        <div class="track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <img v-for="(img, i) in images" :key="i" :src="img" draggable="false" />
        </div>

        <button class="nav prev" @click="prev">‹</button>
        <button class="nav next" @click="next">›</button>
    </div>
</template>

<style scoped>
.slider {
    position: relative;
    overflow: hidden;
    width: 75%;
    user-select: none;
}

.track {
    display: flex;
    transition: transform 0.35s ease;
}

.track img {
    width: 100%;
    flex-shrink: 0;
    object-fit: contain;
    height: auto; 
}

.nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 2rem;
    padding: 0 0.6rem;
    cursor: pointer;
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
}
</style>
