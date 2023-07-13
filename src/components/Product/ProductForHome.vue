<template>
    <Card class="product">
        <template #header>
            <div @click="gotoProductDetail"
                class="  hover:scale-105 transition-transform ease-in-outtransition-transform duration-300 ease-in-out">
                <Image :src="primaryImage?.imageUrl" alt="Image" />
            </div>
        </template>
        <template #title>{{ product?.product?.brand?.name }}</template>
        <template #subtitle>
            <div @click="gotoProductDetail">
                {{ product?.product?.name }}
            </div>
        </template>
        <template #content>${{ product?.product?.price }}</template>
        <template #footer>
            <i class="pi pi-heart"></i>
            <p>10</p>
        </template>
    </Card>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import { computed } from 'vue';
import Card from 'primevue/card';
import { useRouter } from 'vue-router';
import { ProductVariationType } from '@/types/productVariation';

export interface ProductProps {
    product?: ProductVariationType;
}

const router = useRouter();
const props = defineProps<ProductProps>();

const primaryImage = computed(() => props.product?.productImages?.find(productImage => productImage.isPrimary));

const gotoProductDetail = () => {
    router.push({ name: "Product", params: { productId: props.product?.productVariationId } });
}

</script>