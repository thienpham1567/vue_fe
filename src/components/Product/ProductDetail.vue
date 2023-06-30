<template>
    <div class="flex">
        <div class="w-full lg:w-7/12 ml-2 mr-2 mb-4">
            <div>
                <div>
                    <Image :src="primaryImage?.imageUrl" alt="Image" preview />
                </div>
                <div class="flex gap-1">
                    <div v-for="image in orderImages">
                        <Image :src="image?.imageUrl" alt="Image" preview />
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
                        <label class="text-2xl ml-1">${{ getProduct.product?.price }}</label>
                    </div>
                    <div class="mt-4">
                        <label class="text-2xl ml-1">Color: White</label>
                    </div>
                    <div>
                        <label class="text-2xl ml-1">Sizes:</label>
                        <div class="">
                            <div v-if="showAdultShoesSize" class="flex flex-row flex-wrap gap-3">
                                <div v-for="(size, index) in adultSizes" :key="index" class="size">
                                    <RadioButton v-model="selectedSize" :inputId="size" :value="size" class="w-full"/>
                                    <label :for="size">{{ size }}</label>
                                </div>
                            </div>
                            <div v-else-if="showKidShoesSizes" class="flex flex-row flex-wrap gap-2">
                                <div v-for="(size, index) in kidSizes" :key="index" class="size">
                                    <RadioButton v-model="selectedSize" :inputId="size" :value="size" />
                                    <label :for="size">{{ size }}</label>
                                </div>
                            </div>
                            <div v-else class="flex flex-row flex-wrap gap-2">
                                <div v-for="(size, index) in clothingSizes" :key="index" class="size">
                                    <RadioButton v-model="selectedSize" :inputId="size" :value="size" />
                                    <label :for="size">{{ size }}</label>
                                </div>
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
import { useProductStore, useSizeStore } from "@/store";
import Image from 'primevue/image';
import RadioButton from 'primevue/radiobutton';

const route = useRoute();
const { getProduct, fetchOneProduct } = useProductStore();
const { kidSizes, adultSizes, clothingSizes } = useSizeStore();
const { productId } = route.params;
let selectedSize = ref();

// computed
const primaryImage = computed(() => getProduct.value.productImages?.find(productImage => productImage.isPrimary));
const orderImages = computed(() => getProduct.value.productImages?.filter(productImage => !productImage.isPrimary));
const showKidShoesSizes = computed(() => {
    let category = getProduct.value.product?.category;
    return category?.code === "Shoes" && category.parentCategory?.name === "Kid";
});
const showAdultShoesSize = computed(() => {
    let category = getProduct.value.product?.category;
    return category?.code === "Shoes" && (category.parentCategory?.name === "Men" || category.parentCategory?.name === "Women");
});
const showClothingSize = computed(() => {
    let category = getProduct.value.product?.category;
    return category?.code === "Clothing";
});

onMounted(() => fetchOneProduct(+productId));
</script>