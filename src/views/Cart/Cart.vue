<template>
    <div class="flex flex-col lg:flex-row">
        <!-- Left column start -->
        <div class="w-full lg:w-8/12 mx-4 mb-4 mt-4">
            <div class="bg-gray-200 flex justify-between text-black font-semibold p-2">
                <div class="ml-4">{{ $t('item') }}</div>
                <div class="mr-4">{{ $t('price') }} / {{ $t('quantity') }}</div>
            </div>
            <CartItem />
        </div>
        <!-- Left column End -->

        <!-- Right column start -->
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

interface Product {
    id: number;
    name: string;
    image: string;
    category: string;
    price: number;
    quantity: number;
}


const products = ref<Product[]>([
    {
        id: 1,
        name: 'Product 1',
        image: 'https://assets.adidas.com/images/f_auto,q_auto,fl_lossy,c_fill,g_auto/52449ae7f1fe43efb178af4901514646_9366/Barricade_Tennis_Shoes_Blue_HP7417_01_standard.jpg',
        category: 'Category 1',
        price: 10,
        quantity: 0
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'https://assets.adidas.com/images/f_auto,q_auto,fl_lossy,c_fill,g_auto/2a6cf9b6bec34ddeb72aaf4901515810_9366/Barricade_Tennis_Shoes_Blue_HP7417_02_standard.jpg',
        category: 'Category 2',
        price: 20,
        quantity: 0
    },
    {
        id: 3,
        name: 'Product 3',
        image: 'https://assets.adidas.com/images/f_auto,q_auto,fl_lossy,c_fill,g_auto/4eaecbe6bb0f45a59e28af4901517324_9366/Barricade_Tennis_Shoes_Blue_HP7417_05_standard.jpg',
        category: 'Category 1',
        price: 15,
        quantity: 0
    },
    {
        id: 4,
        name: 'Product 4',
        image: 'https://assets.adidas.com/images/f_auto,q_auto,fl_lossy,c_fill,g_auto/21b9bbfa944540309c67af4901516187_9366/Barricade_Tennis_Shoes_Blue_HP7417_03_standard.jpg',
        category: 'Category 2',
        price: 25,
        quantity: 0
    },
    {
        id: 5,
        name: 'Product 5',
        image: 'https://assets.adidas.com/images/f_auto,q_auto,fl_lossy,c_fill,g_auto/2204e27345dc4701bf06af49015169c0_9366/Barricade_Tennis_Shoes_Blue_HP7417_04_standard.jpg',
        category: 'Category 1',
        price: 12,
        quantity: 0
    },
    {
        id: 6,
        name: 'Product 6',
        image: 'https://assets.adidas.com/images/f_auto,q_auto,fl_lossy,c_fill,g_auto/7778b41b65f746dcae6dae9700cb08ce_9366/Barricade_Tennis_Shoes_Orange_GW3816_01_standard.jpg',
        category: 'Category 2',
        price: 18,
        quantity: 0
    },
    {
        id: 7,
        name: 'Product 7',
        image: 'https://assets.adidas.com/images/f_auto,q_auto,fl_lossy,c_fill,g_auto/5f83dc084f7d4fd386f2ae9700cb223a_9366/Barricade_Tennis_Shoes_Orange_GW3816_02_standard.jpg',
        category: 'Category 1',
        price: 14,
        quantity: 0
    },
    {
        id: 8,
        name: 'Product 8',
        image: 'https://assets.adidas.com/images/f_auto,q_auto,fl_lossy,c_fill,g_auto/680b6b9f97ae479da701ae9700cb31bb_9366/Barricade_Tennis_Shoes_Orange_GW3816_03_standard.jpg',
        category: 'Category 2',
        price: 22,
        quantity: 0
    },
    {
        id: 8,
        name: 'Product 8',
        image: 'https://assets.adidas.com/images/f_auto,q_auto,fl_lossy,c_fill,g_auto/680b6b9f97ae479da701ae9700cb31bb_9366/Barricade_Tennis_Shoes_Orange_GW3816_03_standard.jpg',
        category: 'Category 2',
        price: 22,
        quantity: 0
    },
    {
        id: 8,
        name: 'Product 8',
        image: 'https://assets.adidas.com/images/f_auto,q_auto,fl_lossy,c_fill,g_auto/680b6b9f97ae479da701ae9700cb31bb_9366/Barricade_Tennis_Shoes_Orange_GW3816_03_standard.jpg',
        category: 'Category 2',
        price: 22,
        quantity: 0
    },
]);
const increment = (product: Product) => {
    product.quantity++;
};

const decrement = (product: Product) => {
    if (product.quantity > 0) {
        product.quantity--;
    }
};

function goToCheckout() {
    router.push('/checkout');
}
</script>


