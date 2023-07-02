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
                <label class="text-2xl">{{ selectedProduct.product?.brand?.name }}</label>
            </div>
            <div class="mt-2">
                <label class="text-xl">{{ selectedProduct.product?.name }}</label>
            </div>
            <div class="mt-2">
                <label class="text-4xl">${{ selectedProduct.product?.price }}</label>
            </div>
            <div class="mt-4">
                <label class="text-l font-semibold">Color: <span class="inline font-normal">{{ selectedProduct.color?.value
                }}</span> </label>
                <div class="flex flex-wrap gap-2 items-center mt-1">
                    <div v-for="product in getAllProducts" :key="product.productVariationId" class="color-product"
                        :class="{ 'selected-color': selectedProduct.color?.colorId === product.color?.colorId }"
                        @click="onSelectProduct(product)">
                        <Image :src="product.productImages?.find(image => image.isPrimary === true)?.imageUrl" alt="Image"
                            width="80" />
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <div
                    v-if="selectedProduct.product?.category?.parentCategory?.name === 'Men' || selectedProduct.product?.category?.parentCategory?.name === 'Women'">
                    <label class="text-l font-semibold">Men's Sizes:</label>
                    <div class="flex flex-row flex-wrap gap-2 mt-1">
                        <div v-for="size in adultShoesSizes" :key="size.sizeId" class="size">
                            <RadioButton v-model="selectedSize" :inputId="size.sizeId?.toString()" :value="size"
                                :disabled="size.isOutOfStock" @update:modelValue="onSelectSize" />
                            <label :for="size.sizeId?.toString()">{{ size.value }}</label>
                        </div>
                    </div>
                </div>
                <div v-else-if="selectedProduct.product?.category?.parentCategory?.name === 'Kid'">
                    <label class="text-l font-semibold">Kid's Sizes:</label>
                    <div class="flex flex-row flex-wrap gap-2 mt-1">
                        <div v-for="size in kidShoesSizes" :key="size.sizeId" class="size">
                            <RadioButton v-model="selectedSize" :inputId="size.sizeId?.toString()" :value="size"
                                :disabled="size.isOutOfStock" @update:modelValue="onSelectSize" />
                            <label :for="size.sizeId?.toString()">{{ size.value }}</label>
                        </div>
                    </div>
                </div>
                <div v-else-if="selectedProduct.product?.category?.code === 'Clothing'">
                    <label class="text-l font-semibold">Clothing's Sizes:</label>
                    <div class="flex flex-row flex-wrap gap-2 mt-1">
                        <div v-for="size in clothingSizes" :key="size.sizeId" class="size">
                            <RadioButton v-model="selectedSize" :inputId="size.sizeId?.toString()" :value="size"
                                :disabled="size.isOutOfStock" @update:modelValue="onSelectSize" />
                            <label :for="size.sizeId?.toString()">{{ size.value }}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <Button label="Add to cart" class="btn w-full" size="small" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import { useRoute } from "vue-router";
import { ProductVariationType } from "@/types/productVariation";
import { useProductStore, useSizeStore } from "@/store";
import { ref, onMounted, computed, Ref } from "vue";

const route = useRoute();
const { productId } = route.params;
const { getProduct, getAllProducts, fetchOneProduct } = useProductStore();
const { fetchSizes, getSizes } = useSizeStore();

let selectedProduct: Ref<ProductVariationType> = ref({});
let selectedSize = ref();

// computed
const kidShoesSizes = computed(() => {
    let category = selectedProduct.value.product?.category?.parentCategory;
    let sizes = getSizes.value.filter(size => {
        let categoryName = category?.name;
        return size.code === "Shoes" && size.category?.name === categoryName;
    });
    return sizes.map(size => {
        let productSizes = selectedProduct.value.productVariationSizes;
        if (productSizes?.find(sizeProduct => size.sizeId === sizeProduct.size?.sizeId && sizeProduct.quantity! > 0)) {
            return {
                ...size, isOutOfStock: false,
            }
        } else {
            return {
                ...size, isOutOfStock: true,
            }
        }
    });
});
const adultShoesSizes = computed(() => {
    let category = selectedProduct.value.product?.category?.parentCategory;
    let sizes = getSizes.value.filter(size => {
        let categoryName = category?.name;
        return size.code === "Shoes" && size.category?.name === categoryName;
    });
    return sizes.map(size => {
        let productSizes = selectedProduct.value.productVariationSizes;
        if (productSizes?.find(sizeProduct => size.sizeId === sizeProduct.size?.sizeId && sizeProduct.quantity! > 0)) {
            return {
                ...size, isOutOfStock: false,
            }
        } else {
            return {
                ...size, isOutOfStock: true,
            }
        }
    });
});
const clothingSizes = computed(() => {
    let category = selectedProduct.value.product?.category?.parentCategory;
    let sizes = getSizes.value.filter(size => {
        let categoryName = category?.name;
        return size.code === "Clothing" && size.category?.name === categoryName;
    });
    return sizes.map(size => {
        let productSizes = selectedProduct.value.productVariationSizes;
        if (productSizes?.find(sizeProduct => size.sizeId === sizeProduct.size?.sizeId && sizeProduct.quantity! > 0)) {
            return {
                ...size, isOutOfStock: false,
            }
        } else {
            return {
                ...size, isOutOfStock: true,
            }
        }
    });
});

const primaryImage = computed(() => selectedProduct.value.productImages?.find(productImage => productImage.isPrimary));
const orderImages = computed(() => selectedProduct.value.productImages?.filter(productImage => !productImage.isPrimary));

// functions
const onSelectSize = () => {
    console.log(selectedSize);
}

const onSelectProduct = (product: ProductVariationType) => {
    selectedProduct.value = product;
}

const fetchData = () => {
    Promise.all([fetchSizes(), fetchOneProduct(+productId)]).then(() => {
        selectedProduct.value = getProduct.value;
    });
}

onMounted(fetchData);
</script>