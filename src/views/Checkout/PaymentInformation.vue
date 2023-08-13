<template>
	<Steps :model="items" aria-label="Form Steps" />
	<div class="flex flex-col lg:flex-row">
		<div class="w-full lg:w-8/12 mb-4 mt-4 border shadow rounded">
			<div class="text-2xl m-4">Phương thức thanh toán</div>
			<Card>
				<div class="">

				</div>
				<div class="px-4">
					<div class="text-right">
						<button class="btn-color-medium text-white font-semibold p-2 rounded w-1/3 mt-4" type="submit">
							Mua hàng
						</button>
					</div>
				</div>
			</Card>
		</div>
		<Order />
	</div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import Steps from 'primevue/steps';
import { ref } from 'vue';

const items = ref([
    {
        label: 'Information and Address',
        to: "/checkout/address"
    },
    {
        label: 'Payment Information',
        to: "/checkout/payment",
    },
    {
        label: 'Order Confirmation',
        to: "/checkout/confirmation",
    },
]);

</script>