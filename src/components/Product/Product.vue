<template>
    <Card class="product">
        <template #header>
            <Image :src="primaryImage?.imageUrl" alt="Image" />
        </template>
        <template #title>{{ product?.product?.brand?.name }}</template>
        <template #subtitle>{{ product?.product?.name }}</template>
        <template #content>${{ product?.product?.price }}</template>
    </Card>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import { computed } from 'vue';
import Card from 'primevue/card';
import { ProductVariationType } from '@/types/productVariation';

export interface ProductProps {
    product?: ProductVariationType;
}

const props = defineProps<ProductProps>();

const primaryImage = computed(() => props.product?.productImages?.find(productImage => productImage.isPrimary));

</script>

<style>
.zoom-image {
    transition: transform 0.3s;
}

.zoom-image:hover {
    transform: scale(1.1);
}
</style>