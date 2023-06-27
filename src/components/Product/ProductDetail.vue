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
                        <label class="text-3xl ml-1">Product Name</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">Mã sản phẩm</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-xl ml-1">SKU Code</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">Price</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">or 4 interest-free payments of $21.24 with </label>
                    </div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">star ratting</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">Color: White</label>
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
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useProductStore } from "@/store";

const route = useRoute();
const {getProduct, fetchOneProduct} = useProductStore();
const { productId } = route.params;

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

onMounted(() => fetchOneProduct(+productId));
</script>