<template>
    <Card class="product flex">
        <template #header>
            <div @click="gotoProductDetail" class="w-20">
                <Image :src="primaryImage?.imageUrl" alt="Image" class="fixed-size-image" />
            </div>
        </template>
        <template #title>{{ product?.product?.brand?.name }}</template>
        <template #subtitle>
            <div @click="gotoProductDetail">
                {{ product?.product?.name }}
            </div>
        </template>
        <template #content>${{ product?.product?.price }}</template>
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