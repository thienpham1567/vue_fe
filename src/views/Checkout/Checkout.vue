<template>
    <div class="flex flex-col lg:flex-row">
        <!-- Left column start -->
        <div class="w-full lg:w-8/12 mb-4 mt-4 border">
            <div class="mb-4">
                <div class="py-2">
                    <div class="text-2xl mt-4 ml-4">{{ $t('deliinfo') }}</div>
                </div>
                <div class="border-b mx-4 mb-2"></div>
                <div class="px-4 pb-4 rounded">
                    <div class="flex flex-wrap -mx-2">
                        <div class="w-full lg:w-1/2 px-2 py-3">
                            <label for="Name" class="text-gray-700">{{ $t('cname') }}</label>
                            <InputText class="w-full" placeholder="" />
                        </div>
                        <div class="w-full lg:w-1/2 px-2 py-3">
                            <label for="Phone" class="text-gray-700">{{ $t('pnum') }}</label>
                            <InputText class="w-full" placeholder="+0909436072" />
                        </div>
                        <div class="w-full px-2 py-3">
                            <label for="Email" class="text-gray-700">Email</label>
                            <InputText class="w-full" placeholder="example@gmail.com" />
                        </div>
                        <div class="w-full px-2 py-3">
                            <label for="Address" class="text-gray-700">{{ $t('address') }}</label>
                            <InputText class="w-full" placeholder="e.g. 138 Quang Trung" />
                        </div>
                        <div class="w-full px-2 py-3">
                            <label for="State" class="text-gray-700">Phường (Xã)</label>
                            <InputText class="w-full" placeholder="District 11" />
                        </div>
                        <div class="w-full lg:w-1/2 px-2 py-3">
                            <label for="City" class="text-gray-700">{{ $t('city') }}</label>
                            <InputText class="w-full" placeholder="Ho Chi Minh city" />
                        </div>
                        <div class="w-full lg:w-1/2 px-2 py-3">
                            <label for="State" class="text-gray-700">{{ $t('district') }}</label>
                            <InputText class="w-full" placeholder="District 11" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-b mx-4 mb-2"></div>
            <div class="mb-4">
                <div class="flex items-center justify-between px-4 py-2">
                    <div class="text-xl">{{ $t('scheduledeli') }}</div>
                    <InputSwitch v-model="checked" />
                </div>
                <div class="px-4 pb-4">
                    <div class="mb-2">
                        <label for="Address" class="text-gray-600">{{ $t('note') }}</label>
                    </div>
                    <Textarea class="w-full" v-model="value" rows="5" cols="30" :disabled="!checked" />
                    <div class="mt-4">
                        <div class="mb-2">
                            <label for="Address" class="text-gray-600">{{ $t('date') }}</label>
                        </div>
                        <Calendar v-model="dates" selectionMode="range" :manualInput="false" placeholder="Type your note"
                            dateFormat="dd/mm/yy" class="w-full" :disabled="!checked" />
                    </div>
                </div>
            </div>

            <div class="pt-2 pb-4">
                <div class="flex items-center justify-between px-4 py-2">
                    <div class="text-xl">{{ $t('paymethod') }}</div>
                </div>
                <div class="px-4 pt-2 flex gap-4">
                    <div class="flex">
                        <RadioButton v-model="ingredient" inputId="ingredient1" name="OnlinePayment"
                            value="OnlinePayment" />
                        <label for="ingredient1" class="ml-2">{{ $t('onlpay') }}</label>
                    </div>
                    <div class="flex">
                        <RadioButton v-model="ingredient" inputId="CashOnDelivery" name="pizza" value="CashOnDelivery" />
                        <label for="ingredient2" class="ml-2">{{ $t('cod') }}</label>
                    </div>
                </div>
            </div>
        </div>
        <!-- Left column End -->

        <!-- Right column start -->
        <div class="lg:w-4/12 mx-4 mt-4 border h-full">
            <div class="py-2">
                <div class="text-2xl mt-4 ml-4">{{ $t('cart-summary') }}</div>
            </div>
            <div class="border-b mx-4 mb-2"></div>
            <div class=" mb-0">
                <div class="px-4 py-2 justify-items-center mt-2 mb-2">
                    <div class="flex justify-between">
                        <div class="font-light">{{ $t('subtotal') }}</div>
                        <div class="font-medium">$1250.32</div>
                    </div>
                    <div class="border-b mt-2"></div>
                    <div class="mt-2">
                        <div class="flex justify-between">
                            <div class="font-light">{{ $t('shippingcost') }}</div>
                            <div class="font-medium">---</div>
                        </div>
                    </div>
                    <div class="border-b mt-2"></div>
                    <div class="mt-2">
                        <div class="flex justify-between">
                            <div class="font-light">{{ $t('total') }}</div>
                            <div class="font-medium">$1250.32</div>
                        </div>
                    </div>
                    <button class="btn-color-medium text-white font-semibold py-2 rounded w-full mt-6"
                        type="submit">
                        Mua Hàng
                    </button>
                </div>
                <div class="px-4 overflow-y-auto max-h-[645px] mb-4">
                    <!-- <div v-for="product in products" :key="product.id" class="mb-4 flex flex-wrap">
                        <div class=" flex w-full">
                            <div class="w-1/3">
                                <img :src="product.image" class="w-full object-contain" />
                            </div>
                            <div class="w-2/3 mt-4 ml-4">
                                <div class="text-lg font-bold">{{ product.name }}</div>
                                <div class="text-gray-500 mb-2">{{ product.category }}</div>
                                <div class="text-xl font-bold">${{ product.price }}</div>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
    <!-- Right column End -->
</template>

<script setup lang="ts">
import Textarea from 'primevue/textarea';
import { ref } from 'vue';
import RadioButton from 'primevue/radiobutton';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
import { useLanguageStore } from '@/store/language';
import { translate } from '@/i18n';
import InputNumber from 'primevue/inputnumber';
const checked = ref(false);
const dates = ref();
const ingredient = ref('');
const $t = translate;
const languageStore = useLanguageStore();
</script>

