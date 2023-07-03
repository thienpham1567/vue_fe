<template>
    <div class="flex items-center justify-center mb-4">
        <AutoComplete v-model="searchQuery" dropdown :suggestions="filteredProducts" @complete="onSearchComplete"
            placeholder="Tìm kiếm..." field="name" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-center p-4">
        <Product v-for="product in getProducts" :product="product" />
    </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/store';
import { onMounted, watch, ref } from 'vue'
import Product from '@/components/Product/Product.vue'
import { useRoute } from "vue-router";
import AutoComplete from 'primevue/autocomplete';
import { ProductVariationType } from '@/types/productVariation';
export interface ProductProps {
    product?: ProductVariationType;
}

const route = useRoute();
const { fetchAllProducts, getProducts } = useProductStore();

const searchQuery = ref('');
const suggestions = ref([]);
const filteredProducts = ref([]);


watch(
    () => route.query,
    toParams => {
        if (toParams.brand || toParams.category) {
            fetchAllProducts(toParams.brand, toParams.category);
        }
    }
);

watch(searchQuery, (newValue) => {
    filterProducts(newValue);
});

function filterProducts(query: string) {
    console.log
    filteredProducts.value = getProducts.value.filter((product: ProductVariationType) =>
        product?.product?.name.toLowerCase().includes(query.toLowerCase())
    );
}

function onSearchComplete() {
    const searchsQuery = searchQuery.value;

    // Xử lý khi người dùng hoàn thành tìm kiếm
    // Ví dụ: Chuyển hướng đến trang kết quả tìm kiếm
    //   route.push({ path: '/search-results', query: { q: searchQueryValue }});
}

onMounted(() => {
    fetchAllProducts(route.query.brand, route.query.category);
    filterProducts('');
});
</script>

