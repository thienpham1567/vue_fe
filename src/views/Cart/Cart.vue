<template>
    <div class="flex flex-col lg:flex-row">
        <div class="w-full lg:w-8/12 mx-4 mb-4 mt-4">
            <div class="bg-gray-200 flex justify-between text-black font-semibold p-2">
                <div class="ml-4">{{ $t('item') }}</div>
                <div class="mr-4">{{ $t('price') }} / {{ $t('quantity') }}</div>
            </div>
            <CartItem />
        </div>
        <div class="lg:w-4/12 mx-4 mt-4">
            <div class=" mb-4 bg-gray-200">
                <button @click="goToCheckout"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-bold ml-5 mt-4 mb-4 py-2 px-4 rounded w-11/12 h-10"
                    type="submit">
                    {{ $t('Proceed-to-checkout') }}
                </button>
                <div class="px-4 py-2 justify-items-center mt-2 mb-6">
                    <div class="flex justify-between">
                        <div class="font-light text-lg">{{ $t('cart-summary') }}</div>
                    </div>
                    <div class="border-b border-gray-400"></div>
                    <div class="mt-2">
                        <div class="flex justify-between">
                            <div class="font-light text-lg">{{ $t('subtotal') }}</div>
                            <div class="font-bold">$114</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import CartItem from '@/components/CartItems/CartItem.vue'
import { useLanguageStore } from '@/store/language';
import { translate } from '@/i18n';
// import InputNumber from 'primevue/inputnumber';
const checked = ref(false);
const dates = ref();
const ingredient = ref('');
const router = useRouter();
const $t = translate;
const languageStore = useLanguageStore();



function goToCheckout() {
    router.push('/checkout');
}
</script>


