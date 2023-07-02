<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-center p-4">
        <Product v-for="product in getProducts" :product="product" />
    </div>
    <!-- <Paginator v-model:first="first" :rows="showMoreCount" :totalRecords="products.length" @onPageChange="onPageChange" /> -->
    <!-- <div class="flex">
        <div class="w-full lg:w-1/5 ml-4 mr-4 mb-4">
            <div class="flex flex-col  h-full p-4">
                <aside class="p-4 flex-grow rounded-lg md:w-64 lg:w-60 ">
                    <div class="mb-4 flex justify-between" @click="toggleSection('brand')">
                        <button class="text-xl font-bold ">
                            <div>Brand</div>
                        </button>
                        <span v-if="showBrandSection">
                            <i class="pi pi-chevron-down"></i>
                        </span>
                        <span v-else>
                            <i class="pi pi-chevron-up"></i>
                        </span>
                    </div>
                    <div v-show="showBrandSection">
                        <div class="mb-2 flex justify-end">
                            <label for="puma" class="mr-2 text-base md:text-lg cursor-pointer">Puma</label>
                            <input type="checkbox" id="puma" v-model="selectedBrands" value="puma"
                                class="w-4 h-4 md:w-6 md:h-6 cursor-pointer" />
                        </div>
                        <div class="mb-2 flex justify-end">
                            <label for="adidas" class="mr-2 text-base md:text-lg cursor-pointer">Adidas</label>
                            <input type="checkbox" id="adidas" v-model="selectedBrands" value="adidas"
                                class="w-4 h-4 md:w-6 md:h-6 cursor-pointer " />
                        </div>
                    </div>

                    <div class="mb-4 flex justify-between" @click="toggleSection('price')">
                        <button class="text-xl font-bold">
                            <div>Price range</div>
                        </button>
                        <span v-if="showPriceSection">
                            <i class="pi pi-chevron-down"></i>
                        </span>
                        <span v-else>
                            <i class="pi pi-chevron-up"></i>
                        </span>
                    </div>
                    <div v-show="showPriceSection">
                        <div class="flex flex-col">
                            <div class="mb-2 flex justify-end items-end">
                                <label for="price-0-100" class="mr-2 text-base md:text-lg cursor-pointer">$0 - $100</label>
                                <input type="checkbox" id="price-0-100" v-model="selectedPriceRanges" value="0-100"
                                    class="w-4 h-4 md:w-6 md:h-6 cursor-pointer" />
                            </div>
                            <div class=" mb-2 flex justify-end items-end">
                                <label for="price-100-200" class="mr-2 text-base md:text-lg cursor-pointer">$100 -
                                    $200</label>
                                <input type="checkbox" id="price-100-200" v-model="selectedPriceRanges" value="100-200"
                                    class="w-4 h-4 md:w-6 md:h-6 cursor-pointer " />
                            </div>
                            <div class="mb-2 flex justify-end items-end">
                                <label for="price-200-300" class="mr-2 text-base md:text-lg cursor-pointer">$200 -
                                    $300</label>
                                <input type="checkbox" id="price-200-300" v-model="selectedPriceRanges" value="200-300"
                                    class="w-4 h-4 md:w-6 md:h-6 cursor-pointer " />
                            </div>
                            <div class="mb-2 flex justify-end items-end">
                                <label for="price-300-400" class="mr-2 text-base md:text-lg cursor-pointer">$300 -
                                    $400</label>
                                <input type="checkbox" id="price-300-400" v-model="selectedPriceRanges" value="300-400"
                                    class="w-4 h-4 md:w-6 md:h-6 cursor-pointer " />
                            </div>
                        </div>
                    </div>

                    <div class="mb-4 flex justify-between" @click="toggleSection('size')">
                        <button class="text-xl font-bold">
                            <div>Size</div>
                        </button>
                        <span v-if="showSizeSection">
                            <i class="pi pi-chevron-down"></i>
                        </span>
                        <span v-else>
                            <i class="pi pi-chevron-up"></i>
                        </span>
                    </div>
                    <div v-show="showSizeSection">
                        <div class="mb-2" v-for="size in sizes" :key="size">
                            <div class="flex justify-end">
                                <label class="mr-2 text-base md:text-lg cursor-pointer" :for="'size-' + size">Kích cỡ {{
                                    size
                                }}</label>
                                <input type="checkbox" :id="'size-' + size" v-model="selectedSizes" :value="size"
                                    class="w-4 h-4 md:w-6 md:h-6 cursor-pointer " />
                            </div>
                        </div>

                    </div>
                </aside>
            </div>
        </div>

        <div class="h-4/5 lg:w-4/5 mt-4 mr-4 mb-4 sticky top-0">
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 justify-center p-4">
                <Card v-for="(product, index) in displayedProducts" :key="index" :product="product" class="p-4">
                    <template #header>
                        <a href="">
                            <img alt="user header"
                                src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg"
                                class="zoom-image" />
                        </a>
                    </template>
                    <template #title>{{ product.name }}</template>
                    <template #subtitle>Puma - <span class="text-lg font-bold">${{ product.price.toFixed(2)
                    }}</span></template>
                    <template #content>{{ product.description }}</template>
                    <template #footer>
                        <div class="flex items-center ">
                            <div class="mr-4">
                                <Button label="Add to cart" icon="pi pi-shopping-cart" />
                            </div>
                            <div>
                                <Button icon="pi pi-heart" severity="secondary" />
                            </div>
                        </div>
                    </template>
                </Card>
            </div>
            <Paginator v-model:first="first" :rows="showMoreCount" :totalRecords="products.length"
                @onPageChange="onPageChange" />
        </div>
    </div> -->
</template>

<script setup lang="ts">
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
    toParams => {
        if (toParams.brand || toParams.category) {
            fetchAllProducts(toParams.brand, toParams.category);
        }
    }
);

onMounted(() => {
    fetchAllProducts(route.query.brand, route.query.category);
});

// Xử lý khi chuyển trang
// const onPageChange = (event: { page: number; rows: number }) => {
//     first.value = (event.page - 1) * showMoreCount.value;
// };

// const selectedBrands = ref<string[]>([]);
// const selectedPriceRanges = ref<string[]>([]);
// const selectedSizes = ref<string[]>([]);
// const sizes = ['7', '8', '9', '10'];
// const showBrandSection = ref(true);
// const showPriceSection = ref(true);
// const showSizeSection = ref(true);

// const toggleSection = (section: string) => {
//     if (section === 'brand') {
//         showBrandSection.value = !showBrandSection.value;
//     } else if (section === 'price') {
//         showPriceSection.value = !showPriceSection.value;
//     } else if (section === 'size') {
//         showSizeSection.value = !showSizeSection.value;
//     }
// };
</script>

