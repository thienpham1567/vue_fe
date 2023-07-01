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
                    <label class="text-l">Color: <strong>{{ selectedProduct.color?.value }}</strong></label>
                    <div class="flex flex-wrap gap-2 items-center">
                        <div v-for="product in getAllProducts" :key="product.productVariationId">
                            <Image :src="product.productImages?.find(image => image.isPrimary === true)?.imageUrl" alt="Image" width="100" />
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <div
                        v-if="getProduct.product?.category.parentCategory?.name === 'Men' || getProduct.product?.category.parentCategory?.name === 'Women'">
                        <label class="text-l">Men's Sizes:</label>
                        <div class="flex flex-row flex-wrap gap-2 mt-1">
                            <div v-for="size in adultShoesSizes" :key="size.sizeId" class="size">
                                <RadioButton v-model="selectedSize" :inputId="size.sizeId?.toString()" :value="size"
                                    :disabled="size.isOutOfStock" @update:modelValue="onSelectSize" />
                                <label :for="size.sizeId?.toString()">{{ size.value }}</label>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="getProduct.product?.category.parentCategory?.name === 'Kid'">
                        <label class="text-l">Kid's Sizes:</label>
                        <div class="flex flex-row flex-wrap gap-2 mt-1">
                            <div v-for="size in kidShoesSizes" :key="size.sizeId" class="size">
                                <RadioButton v-model="selectedSize" :inputId="size.sizeId?.toString()" :value="size"
                                    :disabled="size.isOutOfStock" @update:modelValue="onSelectSize" />
                                <label :for="size.sizeId?.toString()">{{ size.value }}</label>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="getProduct.product?.category.code === 'Clothing'">
                        <label class="text-l">Clothing's Sizes:</label>
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


// show colors
const productColors = computed(() => getAllProducts);

// computed
const kidShoesSizes = computed(() => {
    let category = getProduct.value.product?.category.parentCategory;
    let sizes = getSizes.value.filter(size => {
        let categoryName = category?.name;
        return size.code === "Shoes" && size.category?.name === categoryName;
    });
    return sizes.map(size => {
        let productSizes = getProduct.value.productVariationSizes;
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
    let category = getProduct.value.product?.category.parentCategory;
    let sizes = getSizes.value.filter(size => {
        let categoryName = category?.name;
        return size.code === "Shoes" && size.category?.name === categoryName;
    });
    return sizes.map(size => {
        let productSizes = getProduct.value.productVariationSizes;
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
    let category = getProduct.value.product?.category.parentCategory;
    let sizes = getSizes.value.filter(size => {
        let categoryName = category?.name;
        return size.code === "Clothing" && size.category?.name === categoryName;
    });
    return sizes.map(size => {
        let productSizes = getProduct.value.productVariationSizes;
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

const primaryImage = computed(() => getProduct.value.productImages?.find(productImage => productImage.isPrimary));
const orderImages = computed(() => getProduct.value.productImages?.filter(productImage => !productImage.isPrimary));

// functions
const onSelectSize = () => {
    console.log(selectedSize);
}

const onSelectProduct = () => {

}

const fetchData = () => {
    Promise.all([fetchSizes, fetchOneProduct(+productId)]).then(() => {
        selectedProduct.value = getProduct.value;
    });
}

onMounted(fetchData);
</script>