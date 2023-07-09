<template>
    <div class=" flex ">
        <div class="w-full lg:w-7/12 ml-4 mr-4 mb-4">
            <!-- Product Detail -->
            <div class="flex flex-wrap">
                <!-- Hình ảnh và nội dung sản phẩm -->
                <div class="img1 my-4">
                    <img
                        src="https://assets.adidas.com/images/w_2000,h_840,c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                </div>
                <div class="flex mb-4">
                    <div class="img2 mr-4">
                        <img
                            src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                    </div>
                    <div class="img3">
                        <img
                            src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                    </div>
                </div>
                <div class="flex mb-4">
                    <div class="img2 mr-4">
                        <img
                            src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                    </div>
                    <div class="img3">
                        <img
                            src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                    </div>
                </div>
                <div class="flex ">
                    <div class="img2 mr-4">
                        <img
                            src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                    </div>
                    <div class="img3">
                        <img
                            src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                    </div>
                </div>
            </div>
        </div>

        <div class="h-4/5 lg:w-5/12 mt-4 mr-4 mb-4 sticky top-0">
            <!-- Aside -->
            <aside class="">
                <div>
                    <div class="mt-4">
                        <label class="text-3xl ml-1">{{ $t('pname') }}</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">{{ $t('pid') }}</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-xl ml-1">{{ $t('sku') }}</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">{{ $t('price') }}</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">or 4 interest-free payments of $21.24 with </label>
                    </div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">{{ $t('rate') }}</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">{{ $t('color') }}</label>
                    </div>
                    <div class="flex flex-wrap">
                        <div class="img-item w-2/12 ml-1">
                            <a href=""><img
                                    src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" /></a>
                        </div>
                        <div class="img-item w-2/12 ml-1">
                            <a href=""><img
                                    src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" /></a>
                        </div>
                        <div class="img-item w-2/12 ml-1">
                            <a href=""><img
                                    src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" /></a>
                        </div>
                        <div class="img-item w-2/12 ml-1">
                            <a href=""><img
                                    src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" /></a>
                        </div>
                        <div class="img-item w-2/12 ml-1">
                            <a href=""><img
                                    src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" /></a>
                        </div>
                    </div>
                    <div>
                        <label class="text-2xl ml-1">This fits true to size.</label>
                    </div>
                    <div>
                        <label class="text-2xl ml-1">Sizes:</label>
                        <div class="text-2xl ml-1 flex flex-wrap">
                            <div v-for="size in sizes" :key="size" class="flex items-center mt-1">
                                <input :type="radioType" :id="'radio-' + size" :aria-label="'Size ' + size" name="d3"
                                    :value="size" :data-label="size" data-track-label="size" class="hidden">
                                <label :for="'radio-' + size" class="flex items-center cursor-pointer">
                                    <div :class="getRadioButtonClass(size)" @click="toggleBorderRed(size)">
                                        <span class="">{{ size }}</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center mt-6 mb-6">
                        <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-11/12 h-10"
                            type="submit">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </aside>
        </div>
    </div>
    <!-- ----------------------------------------------------------------------------------------------------------------- -->
    <div>
        <label class="text-3xl ml-1">Customers Who Viewed This Item Also Viewed</label>
        <div class="carousel">
            <div class="carousel-inner" ref="carouselInner">
                <div class="carousel-item" v-for="product in products" :key="product.id">
                    <div class="card">
                        <img :src="product.image" :alt="product.name" class="card-image">
                        <div class="card-content">
                            <h3 class="card-title">{{ product.name }}</h3>
                            <p class="card-price">{{ product.price }}</p>
                            <p class="card-code">Product Code: {{ product.code }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control prev" @click="prevSlide">
                <span class="arrow">&lt;</span>
            </button>
            <button class="carousel-control next" @click="nextSlide">
                <span class="arrow">&gt;</span>
            </button>
        </div>
    </div>
    <!-- ------------------------------------------------------------------------------------------------- -->
    <div>
        <label class="text-3xl ml-1">Wear It With</label>
        <div class="carousel">
            <div class="carousel-inner" ref="carouselInner">
                <div class="carousel-item" v-for="product in products" :key="product.id">
                    <div class="card">
                        <img :src="product.image" :alt="product.name" class="card-image">
                        <div class="card-content">
                            <h3 class="card-title">{{ product.name }}</h3>
                            <p class="card-price">{{ product.price }}</p>
                            <p class="card-code">Product Code: {{ product.code }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control prev" @click="prevSlide">
                <span class="arrow">&lt;</span>
            </button>
            <button class="carousel-control next" @click="nextSlide">
                <span class="arrow">&gt;</span>
            </button>
        </div>
    </div>
    <!-- ------------------------------------------------------------------------------------------------- -->
    <div>
        <label class="text-3xl ml-1">Customers Who Bought This Item Also Bought</label>
        <div class="carousel">
            <div class="carousel-inner" ref="carouselInner">
                <div class="carousel-item" v-for="product in products" :key="product.id">
                    <div class="card">
                        <img :src="product.image" :alt="product.name" class="card-image">
                        <div class="card-content">
                            <h3 class="card-title">{{ product.name }}</h3>
                            <p class="card-price">{{ product.price }}</p>
                            <p class="card-code">Product Code: {{ product.code }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control prev" @click="prevSlide">
                <span class="arrow">&lt;</span>
            </button>
            <button class="carousel-control next" @click="nextSlide">
                <span class="arrow">&gt;</span>
            </button>
        </div>
    </div>
    <!-- ------------------------------------------------------------------------------------------------- -->
    <div>
        <label class="text-3xl ml-1">Customer Questions</label>

    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLanguageStore } from '@/store/language';
import { translate } from '@/i18n';

const $t = translate;
const languageStore = useLanguageStore();
const isBorderRed = ref<string | null>(null);
const sizes = ref<string[]>(Array.from({ length: 15 }, (_, i) => (i + 4).toString()));
const radioType = ref('radio');

function toggleBorderRed(size: string) {
    isBorderRed.value = size;
}

function getRadioButtonClass(size: string) {
    return [
        'w-16',
        'h-16',
        'rounded-full',
        'border-4',
        'mr-2',
        'transition-colors',
        'duration-300',
        'flex',
        'justify-center',
        'items-center',
        { 'border-blue-500': isBorderRed.value === size }
    ];
}

interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    code: string;
}

const products = ref<Product[]>([
    {
        id: 1,
        name: 'Product 1',
        image: 'path_to_image_1',
        price: '$99.99',
        code: 'ABC123'
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'path_to_image_2',
        price: '$49.99',
        code: 'DEF456'
    },
    {
        id: 3,
        name: 'Product 3',
        image: 'path_to_image_2',
        price: '$49.99',
        code: 'DEF456'
    },
    {
        id: 4,
        name: 'Product 4',
        image: 'path_to_image_2',
        price: '$49.99',
        code: 'DEF456'
    },
    {
        id: 5,
        name: 'Product 5',
        image: 'path_to_image_2',
        price: '$49.99',
        code: 'DEF456'
    },
    {
        id: 6,
        name: 'Product 6',
        image: 'path_to_image_2',
        price: '$49.99',
        code: 'DEF456'
    },
    {
        id: 7,
        name: 'Product 7',
        image: 'path_to_image_2',
        price: '$49.99',
        code: 'DEF456'
    },
    {
        id: 8,
        name: 'Product 8',
        image: 'path_to_image_2',
        price: '$49.99',
        code: 'DEF456'
    },

    // Thêm các sản phẩm khác vào đây
]);

const carouselInner = ref<HTMLElement | null>(null);
function prevSlide() {
    if (carouselInner.value) {
        carouselInner.value.scrollBy({
            left: -carouselInner.value.offsetWidth,
            behavior: 'smooth'
        });
    }
}

function nextSlide() {
    if (carouselInner.value) {
        carouselInner.value.scrollBy({
            left: carouselInner.value.offsetWidth,
            behavior: 'smooth'
        });
    }
}

onMounted(() => {
    carouselInner.value = document.querySelector('.carousel-inner');
});
</script>

<style>
.cicel {
    border-radius: 100%;
}
</style>
  

