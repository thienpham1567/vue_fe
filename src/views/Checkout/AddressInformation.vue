<template>
	<div class="flex flex-col lg:flex-row">
		<div class="w-full lg:w-8/12 mb-4 mt-4 border shadow rounded">
			<div class="mb-4">
				<div class="text-2xl m-4">Thông tin và địa chỉ</div>
				<div class="border-b mx-4 mb-2"></div>
				<div class="px-4">
					<form @submit="onSubmit">
						<div class="flex flex-wrap -mx-2">
							<div class="w-full lg:w-1/2 p-3">
								<label for="Name" class="text-gray-600">Họ và Tên</label>
								<InputText v-bind="fullName" class="w-full mt-4" />
								<span class="errorMessage">{{ errors.fullName }}</span>
							</div>
							<div class="w-full lg:w-1/2 p-3">
								<label for="Phone" class="text-gray-600 mb-1">Số điện thoại</label>
								<InputText v-bind="phoneNumber" class="w-full" placeholder="0909436072" />
								<span class="errorMessage">{{ errors.phoneNumber }}</span>
							</div>
							<div class="w-full p-3">
								<label for="Email" class="text-gray-600 mb-1">Email</label>
								<InputText v-bind="email" class="w-full" placeholder="example@gmail.com" />
								<span class="errorMessage">{{ errors.email }}</span>
							</div>
							<div class="w-full p-3">
								<label for="Address" class="text-gray-600 mb-1">Địa chỉ</label>
								<InputText v-bind="address" class="w-full" placeholder="e.g. 138 Quang Trung" />
								<span class="errorMessage">{{ errors.address }}</span>
							</div>
							<div class="w-full p-3">
								<label for="State" class="text-gray-600 mb-1">Phường (Xã)</label>
								<Dropdown v-bind="ward" :options="getWards" optionLabel="name" placeholder="Chọn Xã(Phường)"
									class="w-full" />
								<span class="errorMessage">{{ errors.ward }}</span>
							</div>
							<div class="w-full lg:w-1/2 p-3">
								<label for="district" class="text-gray-600 mb-1">Chọn Quận(Huyện)</label>
								<Dropdown v-bind="district" :options="getDistricts" optionLabel="name" placeholder="Chọn Quận(Huyện)"
									class="w-full" />
							</div>
							<div class="w-full lg:w-1/2 p-3">
								<label for="City" class="text-gray-600 mb-1">Tỉnh(Thành Phố)</label>
								<Dropdown v-bind="province" :options="getProvinces" optionLabel="name" placeholder="Chọn Tỉnh(Thành Phố)"
									class="w-full" />
							</div>
						</div>
						<div class="text-right">
							<button class="btn-color-medium text-white font-semibold p-2 rounded w-1/3 mt-4" type="submit">
								Tiếp tục thanh toán
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<Order />
	</div>
</template>
  
<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Order from '@/components/Checkout/Order.vue'
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import { useDistrictStore, useWardStore, useProvinceStore } from '@/store';
import { onMounted } from 'vue';
import { ref } from 'vue';

const { fetchWards, getWards } = useWardStore();
const { fetchDistricts, getDistricts } = useDistrictStore();
const { fetchProvinces, getProvinces } = useProvinceStore();
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
let fullAddress = ref();


// Creates a typed schema for vee-validate
const schema = toTypedSchema(
	yup.object({
		fullName: yup.string().required("Họ và tên không được bỏ trống"),
		email: yup.string().required("Email không được bỏ trống").email("Email không đúng định dạng"),
		phoneNumber: yup.string().required("Số điện thoại không được bỏ trống").matches(phoneRegExp, "Số điện thoại không đúng dịnh dạng").min(10, "Số điện thoại không được dưới 10 chữ số").max(10, "Số điện thoại không được quá 10 chữ số"),
		address: yup.string().required("Địa chỉ không được để trống"),
		ward: yup.object().required("Xã (phường) không được để trống"),
		district: yup.object(),
		province: yup.object(),
	}),
);
const { errors, values, defineInputBinds, handleSubmit, defineComponentBinds } = useForm({
	validationSchema: schema,
});

let fullName = defineInputBinds("fullName");
let phoneNumber = defineInputBinds("phoneNumber");
let email = defineInputBinds("email");
let address = defineInputBinds("address");
let ward = defineComponentBinds("ward");
let district = defineComponentBinds("district");
let province = defineComponentBinds("province");

const onSubmit = handleSubmit(values => {
	console.log(values);
});

const fetchData = () => {
	Promise.all([fetchWards(), fetchDistricts(), fetchProvinces()]);
}

onMounted(fetchData)
</script>
  