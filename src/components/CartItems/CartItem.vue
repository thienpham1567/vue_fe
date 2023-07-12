<template>
    <div class="flex flex-col items-center justify-center"
        v-if="cartItems.length! <= 0">
        <Image :src="EmptyCartLogo" alt="Image" width="400" />
        <p>Không có sản phảm nào trong giỏ hàng</p>
    </div>
    <div v-else class="w-full h-5/6 mt-2">
        <div v-for="item in cartItems" :key="item.cartItemId" class="mb-1 flex flex-wrap">
            <div class="rounded-lg flex w-full gap-1">
                <div class="w-1/4 ">
                    <Image :src="item.imageUrl" alt="Image" width="200" />
                </div>
                <div class="w-2/4 ml-4">
                    <div class="text-base font-normal">{{ item.productVariationSize?.productVariation.product?.name }}</div>
                    <div class="text-xl font-semibold">{{ item.productVariationSize?.productVariation.product?.brand?.name }}</div>
                    <div class="text-base font-light">Color: {{ item.color.value }}</div>
                    <div class="text-base font-light">Size: {{ item.productVariationSize?.size?.value }}</div>
                </div>
                <div class="flex flex-col justify-between">
                    <div class="text-l font-semibold text-end">${{ item.price }}</div>
                    <div class="flex justify-center mt-2">
                        <Button icon="pi pi-minus" class="p-button-secondary p-button-text mr-2" @click=""></Button>
                        <div class="bg-white w-12 flex justify-center items-center">{{ item.quantity }}</div>
                        <Button icon="pi pi-plus" class="p-button-secondary p-button-text ml-2" @click="addUpdateToCart({
                            productVariationSize: item.productVariationSize,
                            color: item.color,
                            cartId: '',
                            quantity: 1,
                            imageUrl: item.imageUrl
                        })"></Button>
                    </div>
                    <div class="mt-2 text-end cursor-pointer" @click="removeItemFromCart(item.cartItemId!)">Remove</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CartType } from '@/types/cart';
import Image from 'primevue/image';
import Button from 'primevue/button';
import EmptyCartLogo from "@/assets/images/empty_cart.png";
import { useCartStore } from "@/store";
import { cart } from '@/router/cart';
import { CartItemType } from '@/types/cartItem';
export interface CartItemProps {
    cart?: CartType;
    cartItems: CartItemType[];
}

const props = defineProps<CartItemProps>();
const { addUpdateToCart, removeItemFromCart } = useCartStore();

</script>
