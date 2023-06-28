<template>
    <div class="flex">
        <div class="w-full lg:w-7/12 ml-2 mr-2 mb-4">
            <div>
                <div>
                    <Image :src="primaryImage?.imageUrl" alt="Image" preview/>
                </div>
                <div class="flex gap-1">
                    <div v-for="image in orderImages">
                        <Image :src="image?.imageUrl" alt="Image" preview/>
                    </div>
                </div>
            </div>
        </div>

        <div class="h-4/5 lg:w-5/12 mt-4 mr-4 mb-4 sticky top-0">
            <aside class="">
                <div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">{{ getProduct.product?.brand?.name }}</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-3xl ml-1">{{ getProduct.product?.name }}</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-xl ml-1">SKU Code</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">${{ getProduct.product?.price }}</label>
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
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "@/store";
import Image from 'primevue/image';

const route = useRoute();
const { getProduct, fetchOneProduct } = useProductStore();
const { productId } = route.params;

const primaryImage = computed(() => getProduct.value.productImages?.find(productImage => productImage.isPrimary));

const orderImages = computed(() => getProduct.value.productImages?.filter(productImage => !productImage.isPrimary));

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