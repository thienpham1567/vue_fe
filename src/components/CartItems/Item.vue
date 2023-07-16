<template>
    <div class="flex flex-wrap">
        <div class="rounded-lg flex w-full gap-1">
            <div>
                <Image :src="item.imageUrl" alt="Image" width="150" />
            </div>
            <div class="w-3/4 ml-4">
                <div class="text-base font-normal">{{ item.productVariationSize?.productVariation.product?.name }}</div>
                <div class="text-l font-medium">{{ item.productVariationSize?.productVariation.product?.brand?.name
                }}</div>
                <div class="text-sm text-base font-light">Màu: {{ item.color.value }}</div>
                <div class="text-sm font-light">Kích cỡ: {{ item.productVariationSize?.size?.value }}</div>
            </div>
            <div class="flex flex-col justify-between">
                <div class="text-l font-medium text-end">${{ item.price }}</div>
                <div class="flex justify-center mt-2">
                    <Dropdown v-model="item.quantity" :options="limitedQuantity"
                        @update:modelValue="updateQuantity" />
                </div>
                <div class="text-sm text-end cursor-pointer" @click="removeItemFromCart(item.cartItemId!)">Loại bỏ</div>
            </div>
        </div>
    </div>
    <div class="border-item"></div>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import { useCartStore } from "@/store";
import { CartItemType } from "@/types/cartItem";
import Dropdown from 'primevue/dropdown';

export interface ItemProps {
    item: CartItemType;
}

const props = defineProps<ItemProps>();
const limitedQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const { addUpdateToCart, removeItemFromCart } = useCartStore();

const updateQuantity = (newQuantity: number) => {
    addUpdateToCart({
        productVariationSize: props.item.productVariationSize,
        color: props.item.color,
        cartId: '',
        quantity: newQuantity,
        imageUrl: props.item.imageUrl
    })
}
</script>