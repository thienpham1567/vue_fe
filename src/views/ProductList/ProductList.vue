<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-center p-4">
    <Product v-for="product in getProducts" :product="product"/>
  </div>
  <!-- <Paginator v-model:first="first" :rows="showMoreCount" :totalRecords="products.length" @onPageChange="onPageChange" /> -->
</template>
  
  
<script setup lang="ts">
import { computed } from 'vue';
// import Paginator from 'primevue/paginator';
import { useProductStore } from '@/store';
import { onMounted, watch } from 'vue'
import Product from '@/components/Product/Product.vue'
import { useRoute } from "vue-router";

const route = useRoute();
const { fetchAllProducts, getProducts } = useProductStore();


// const showMoreCount = ref(8); // Số lượng sản phẩm hiển thị ban đầu
// const first = ref(0); // Vị trí bắt đầu

// // Tính toán danh sách sản phẩm hiển thị trên từng trang
// const displayedProducts = computed(() => {
//   return products.value.slice(first.value, first.value + showMoreCount.value);
// });

// // Xử lý khi chuyển trang
// const onPageChange = (event: { page: number; rows: number }) => {
//   first.value = (event.page - 1) * showMoreCount.value;
// };

watch(
  () => route.query,
  async toParams => {
    if(toParams.brand || toParams.category){
      await fetchAllProducts(toParams.brand, toParams.category);
    }
  }
);

onMounted(async () => {
  await fetchAllProducts(route.query.brand, route.query.category);
});
</script>

