<template>
  <div class="container" style="max-width: 100%;">
    <div class="Card">
      <Carousel :value="spham" :numVisible="1" :numScroll="1" circular :autoplayInterval="4000">
        <template #item="slotProps">
          <div class="border-1 surface-border border-round m-2 ">
            <div class="Relative">
              <!-- <div class="mb-1 justify-content-center" id="carouselhome">
                <img :src="slotProps.data" :alt="slotProps.data" class="shadow-2" />
              </div>   -->
              <div class="mb-1 justify-content-center relative" id="carouselhome">
                <img :src="slotProps.data" :alt="slotProps.data" class="shadow-2" />
                <a href=""><button class="absolute bottom-10 left-12 bg-gray-800  transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-md" label="Secondary" severity="secondary" style="padding: 20px; font-size: 1.3rem;">Shop now</button></a>
                  
              </div>
            </div>
                
           
          </div>
        </template>
      </Carousel>
    </div>
    <h3>Sản phẩm hot</h3><br>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-center p-4 mt-3" >
      <Product v-for="product in getProducts" :product="product" />
    </div>
    
    
  </div>
</template>

<script setup lang="ts">

import  Carousel  from "primevue/carousel";
import  Button  from "primevue/button";
import { useProductStore } from '@/store';
import { ref, onMounted, watch } from 'vue'
import Product from '@/components/Product/Product.vue'
import { useRoute } from "vue-router";


const route = useRoute();
const { fetchAllProducts, getProducts } = useProductStore();
const spham = ref<string[]>([
  "https://thumb.tildacdn.com/tild3235-3163-4439-a661-626434373431/-/format/webp/nike-slide4.jpg",
  "https://scontent.fsgn8-4.fna.fbcdn.net/v/t1.6435-9/127506094_1346134662404271_2275478172592726603_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=A71I7jLASUUAX9SxL5p&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfAQvTYD6Xawrbkpn6OKGx5ZkzV9IviquRXAxn40weEMyA&oe=64D581F6",
  "https://static.nike.com/a/images/f_auto/dpr_1.6,cs_srgb/w_1089,c_limit/3d7f5d02-bf49-403a-a77f-04fc8680c54b/nike-just-do-it.jpg",
  // Add more image URLs here
]);

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
