<template>
    <div class="flex">
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
                        <!-- Thêm các checkbox thương hiệu khác nếu cần -->
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
                            <!-- Thêm các checkbox khoảng giá khác nếu cần -->
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
                            <!-- Thêm các checkbox kích cỡ khác nếu cần -->
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

    </div>
</template>
  
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

const products = ref<Product[]>([
    { id: 1, name: 'Product 1', price: 10.99, description: 'Description 1' },
    { id: 2, name: 'Product 2', price: 19.99, description: 'Description 2' },
    { id: 3, name: 'Product 3', price: 5.99, description: 'Description 3' },
    { id: 4, name: 'Product 4', price: 8.99, description: 'Description 4' },
    { id: 5, name: 'Product 5', price: 14.99, description: 'Description 5' },
    { id: 6, name: 'Product 6', price: 12.99, description: 'Description 6' },
    { id: 7, name: 'Product 7', price: 9.99, description: 'Description 7' },
    { id: 8, name: 'Product 8', price: 7.99, description: 'Description 8' },
    { id: 9, name: 'Product 9', price: 11.99, description: 'Description 9' },
    { id: 10, name: 'Product 10', price: 6.99, description: 'Description 10' },
    { id: 11, name: 'Product 11', price: 16.99, description: 'Description 11' },
    { id: 12, name: 'Product 12', price: 13.99, description: 'Description 12' },
    { id: 13, name: 'Product 13', price: 17.99, description: 'Description 13' },
    { id: 14, name: 'Product 14', price: 10.49, description: 'Description 14' },
    { id: 15, name: 'Product 15', price: 9.49, description: 'Description 15' },
    { id: 16, name: 'Product 16', price: 12.49, description: 'Description 16' },
    { id: 17, name: 'Product 17', price: 15.49, description: 'Description 17' },
    { id: 18, name: 'Product 18', price: 8.49, description: 'Description 18' },
    { id: 19, name: 'Product 19', price: 11.49, description: 'Description 19' },
    { id: 20, name: 'Product 20', price: 14.49, description: 'Description 20' },
    { id: 21, name: 'Product 21', price: 9.99, description: 'Description 21' },
    { id: 22, name: 'Product 22', price: 12.99, description: 'Description 22' },
    { id: 23, name: 'Product 23', price: 7.99, description: 'Description 23' },
    { id: 24, name: 'Product 24', price: 15.99, description: 'Description 24' },
    { id: 25, name: 'Product 25', price: 11.99, description: 'Description 25' },
    { id: 26, name: 'Product 26', price: 14.99, description: 'Description 26' },
    { id: 27, name: 'Product 27', price: 8.99, description: 'Description 27' },
    { id: 28, name: 'Product 28', price: 13.99, description: 'Description 28' },
    { id: 29, name: 'Product 29', price: 10.99, description: 'Description 29' },
    { id: 30, name: 'Product 30', price: 6.99, description: 'Description 30' },
    { id: 31, name: 'Product 31', price: 17.99, description: 'Description 31' },
    { id: 32, name: 'Product 32', price: 8.49, description: 'Description 32' },
    { id: 33, name: 'Product 33', price: 12.49, description: 'Description 33' },
    { id: 34, name: 'Product 34', price: 16.49, description: 'Description 34' },
    { id: 35, name: 'Product 35', price: 9.49, description: 'Description 35' },
    { id: 36, name: 'Product 36', price: 14.49, description: 'Description 36' },
    { id: 37, name: 'Product 37', price: 10.99, description: 'Description 37' },
    { id: 38, name: 'Product 38', price: 7.49, description: 'Description 38' },
    { id: 39, name: 'Product 39', price: 13.49, description: 'Description 39' },
    { id: 40, name: 'Product 40', price: 11.49, description: 'Description 40' },
    { id: 41, name: 'Product 41', price: 9.99, description: 'Description 41' },
    { id: 42, name: 'Product 42', price: 12.99, description: 'Description 42' },
    { id: 43, name: 'Product 43', price: 7.99, description: 'Description 43' },
    { id: 44, name: 'Product 44', price: 15.99, description: 'Description 44' },
    { id: 45, name: 'Product 45', price: 11.99, description: 'Description 45' },
    { id: 46, name: 'Product 46', price: 14.99, description: 'Description 46' },
    { id: 47, name: 'Product 47', price: 8.99, description: 'Description 47' },
    { id: 48, name: 'Product 48', price: 13.99, description: 'Description 48' },
    { id: 49, name: 'Product 49', price: 10.99, description: 'Description 49' },
    { id: 50, name: 'Product 50', price: 6.99, description: 'Description 50' },
    { id: 51, name: 'Product 51', price: 17.99, description: 'Description 51' },
    { id: 52, name: 'Product 52', price: 8.49, description: 'Description 52' },
    { id: 53, name: 'Product 53', price: 12.49, description: 'Description 53' },
    { id: 54, name: 'Product 54', price: 16.49, description: 'Description 54' },
    { id: 55, name: 'Product 55', price: 9.49, description: 'Description 55' },
    { id: 56, name: 'Product 56', price: 14.49, description: 'Description 56' },
    { id: 57, name: 'Product 57', price: 10.99, description: 'Description 57' },
    { id: 58, name: 'Product 58', price: 7.49, description: 'Description 58' },
    { id: 59, name: 'Product 59', price: 13.49, description: 'Description 59' },
    { id: 60, name: 'Product 60', price: 11.49, description: 'Description 60' }

]);



const showMoreCount = ref(8); // Số lượng sản phẩm hiển thị ban đầu
const first = ref(0); // Vị trí bắt đầu

// Tính toán danh sách sản phẩm hiển thị trên từng trang
const displayedProducts = computed(() => {
    return products.value.slice(first.value, first.value + showMoreCount.value);
});

// Xử lý khi chuyển trang
const onPageChange = (event: { page: number; rows: number }) => {
    first.value = (event.page - 1) * showMoreCount.value;
};

const selectedBrands = ref<string[]>([]);
const selectedPriceRanges = ref<string[]>([]);
const selectedSizes = ref<string[]>([]);
const sizes = ['7', '8', '9', '10'];
const showBrandSection = ref(true);
const showPriceSection = ref(true);
const showSizeSection = ref(true);

const toggleSection = (section: string) => {
    if (section === 'brand') {
        showBrandSection.value = !showBrandSection.value;
    } else if (section === 'price') {
        showPriceSection.value = !showPriceSection.value;
    } else if (section === 'size') {
        showSizeSection.value = !showSizeSection.value;
    }
};
</script>
  
<style>
.zoom-image {
    transition: transform 0.3s;
}

.zoom-image:hover {
    transform: scale(1.1);
}
</style>
