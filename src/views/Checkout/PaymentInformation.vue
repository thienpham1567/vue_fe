<template>
	<div class="py-10">
		<Steps :model="items" aria-label="Form Steps" />
	</div>
	<div class="flex flex-col lg:flex-row mt-4">
		<div class="w-full">
			<div class="border shadow rounded py-4 px-2 max-h-60">
				<div class="text-xl px-4">Thông tin địa chỉ</div>
			</div>
			<div class="mt-2 border shadow rounded py-4 px-2">
				<div class="text-xl px-4">Phương thức thanh toán</div>
				<div>
					<div class="px-4">
						<div class="flex items-center gap-6">
							<Checkbox v-model="isPaypal" :binary="true" />
							<Image :src="PayPalImg" alt="Image" width="130" />
						</div>
					</div>
					<div class="px-4">
						<div class="text-right">
							<div v-if="isPaypal">
								<button class="btn-color-medium text-white font-semibold p-2 rounded w-1/3 mt-4" type="submit" @click="payWithPaypal">
									Thanh toán với PayPal
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Order />
	</div>
	<div class="text-left">
		<button class="btn-color-light text-white font-semibold p-2 rounded w-1/3 mt-2" type="submit" @click="back">
			Trở lại
		</button>
	</div>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import Checkbox from 'primevue/checkbox';
import Steps from 'primevue/steps';
import { ref } from 'vue';
import Order from '@/components/Checkout/Order.vue'
import { useAddressStore } from '@/store';
import PayPalImg from "@/assets/images/paypal.png";
import { useRouter } from 'vue-router';


const { getAddress } = useAddressStore();
const router = useRouter();

const items = ref([
    {
        label: 'Thông tin và địa chỉ',
        to: "/checkout/address"
    },
    {
        label: 'Phương thức thanh toán',
        to: "/checkout/payment",
    },
    {
        label: 'Xác nhận đơn hàng',
        to: "/checkout/confirmation",
    },
]);

let isPaypal = ref();

const payWithPaypal = () => {
	const token = localStorage.getItem("token");
	if (token) {

	} else {
		router.push({name: "Login"})
	}
}

const back = () => {
	router.back();
}

</script>