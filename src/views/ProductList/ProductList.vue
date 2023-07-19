<template>
    <div class="flex">
        <ATAside />
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-center p-4">
            <Product v-for="product in getProducts" :product="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
import ATAside from '@/components/Layout/ATAside.vue'
import { useProductStore } from '@/store';
import { onMounted, watch } from 'vue'
import Product from '@/components/Product/Product.vue'
import { useRoute } from "vue-router";

const route = useRoute();
const { fetchAllProducts, getProducts } = useProductStore();


watch(
    () => route.query,
    toParams => {
        if (toParams.brand || toParams.category) {
            fetchAllProducts(toParams.brand, toParams.category);
        }
    }
);

onMounted(() => {
    fetchAllProducts(route.query.brand, route.query.category);
});

</script>

