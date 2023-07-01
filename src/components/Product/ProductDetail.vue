<template>
    <div class="flex justify-center gap-2">
        <div class="w-full lg:w-7/12 ml-2 mr-2 mb-4">
            <Image :src="primaryImage?.imageUrl" alt="Image" preview />
            <div class="flex gap-1">
                <div v-for="image in orderImages">
                    <Image :src="image?.imageUrl" alt="Image" preview />
                </div>
            </div>
        </div>
        <div class="lg:w-5/12 mr-4 mb-4 sticky top-0">
            <div>
                <div>
                    <label class="text-2xl">{{ getProduct.product?.brand?.name }}</label>
                </div>
                <div class="mt-3">
                    <label class="text-xl">{{ getProduct.product?.name }}</label>
                </div>
                <div class="mt-3">
                    <label class="text-4xl">${{ getProduct.product?.price }}</label>
                </div>
                <div class="mt-3">
                    <label class="text-l">Color: White</label>
                </div>
                <div class="mt-3">
                    <div v-if="showAdultShoesSize">
                        <label class="text-l ml-1">Men's Sizes:</label>
                        <div class="flex flex-row flex-wrap gap-2">
                            <div v-for="(size, index) in adultSizes" :key="index" class="size">
                                <RadioButton v-model="selectedSize" :inputId="size" :value="size" class="w-full" />
                                <label :for="size">{{ size }}</label>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="showKidShoesSizes">
                        <label class="text-l ml-1">Kid's Sizes:</label>
                        <div class="flex flex-row flex-wrap gap-2">
                            <div v-for="(size, index) in kidSizes" :key="index" class="size">
                                <RadioButton v-model="selectedSize" :inputId="size" :value="size" />
                                <label :for="size">{{ size }}</label>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="showClothingSize">
                        <label class="text-l ml-1">Clothing's Sizes:</label>
                        <div class="flex flex-row flex-wrap gap-2">
                            <div v-for="(size, index) in clothingSizes" :key="index" class="size">
                                <RadioButton v-model="selectedSize" :inputId="size" :value="size" />
                                <label :for="size">{{ size }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5">
                    <Button label="Add to cart" class="btn w-full" size="small" />
                </div>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useProductStore, useSizeStore } from "@/store";
import Image from 'primevue/image';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';

const route = useRoute();
const { getProduct, fetchOneProduct } = useProductStore();
const { fetchSizes, getSizes } = useSizeStore();
const { productId } = route.params;
let selectedSize = ref();

// computed
const primaryImage = computed(() => getProduct.value.productImages?.find(productImage => productImage.isPrimary));
const orderImages = computed(() => getProduct.value.productImages?.filter(productImage => !productImage.isPrimary));
const showKidShoesSizes = computed(() => {
    let category = getProduct.value.product?.category;
    return getSizes.value.map(size => {
        let categoryCode = category?.code;
        let parentCategoryName = category?.parentCategory?.name;
        
    })
});
const showAdultShoesSize = computed(() => {
    let category = getProduct.value.product?.category;
    return category?.code === "Shoes" && (category.parentCategory?.name === "Men" || category.parentCategory?.name === "Women");
});
const showClothingSize = computed(() => {
    let category = getProduct.value.product?.category;
    return category?.code === "Clothing";
});

const fetchData = async () => {
    await fetchSizes();
    await fetchOneProduct(+productId)
}

onMounted(fetchData);
</script>