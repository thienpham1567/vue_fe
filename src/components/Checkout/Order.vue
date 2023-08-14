<template>
	<div class="lg:w-4/12 mx-4 border h-full shadow rounded">
		<div class="text-2xl m-4">Đơn Hàng</div>
		<div class=" mb-0">
			<div class="px-4 py-2 justify-items-center mt-2 mb-2">
				<div class="flex justify-between">
					<div class="font-light">Tổng số phụ</div>
					<div class="font-medium">${{ getCart.itemSubtotalPrice }}</div>
				</div>
				<div class="border-b mt-2"></div>
				<div class="mt-2">
					<div class="flex justify-between">
						<div class="font-light">Phí vận chuyển</div>
						<div class="font-medium">0</div>
					</div>
				</div>
				<div class="border-b mt-2"></div>
				<div class="mt-2">
					<div class="flex justify-between">
						<div class="font-light">Tổng</div>
						<div class="font-medium">${{ getCart.itemSubtotalPrice }}</div>
					</div>
				</div>
			</div>
			<div class="border-b my-2"></div>
			<div class="p-4 overflow-y-auto max-h-80">
				<div v-for="item in getCartItems" :key="item.cartItemId" class="mb-4 flex flex-wrap">
					<div class="flex w-full">
						<Image :src="item.imageUrl" alt="Image" width="70" />
						<div class="w-2/3 ml-2">
							<div class="text-sm">{{ item.productVariationSize?.productVariation?.product?.name }}</div>
							<div class="text-xs text-gray-500 mb-2">{{ item.productVariationSize?.productVariation?.product?.brand?.name+'/'+item.productVariationSize?.productVariation?.color?.value }}</div>
							<div class="flex items-center justify-between">
								<div class="text-xs font-light">${{ item.price }}</div>
								<div class="text-xs font-light">Quantity: {{ item.quantity }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import useCartStore from '../../store/Cart';
import { onMounted } from 'vue';

const { getCart, getCartItems, fetchCart } = useCartStore();

onMounted(fetchCart);
</script>