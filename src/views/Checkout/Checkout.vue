<template>
    <div class="flex flex-col lg:flex-row">
        <!-- Left column start -->
        <div class="w-full lg:w-8/12 mx-4 mb-4 mt-4">
            <div class=" mb-4">
                <div class=" py-2">
                    <div class="text-2xl mt-4">Delivery Information</div>
                </div>
                <div class=" px-4 pb-4">
                    <div class="flex flex-wrap -mx-2">
                        <div class="w-full lg:w-1/2 px-2 mt-4">
                            <div class="mb-2">
                                <label for="Name" class="text-xl">Name</label>
                            </div>
                            <InputText class="w-full" placeholder="" />
                        </div>
                        <div class="w-full lg:w-1/2 px-2 mt-4">
                            <div class="mb-2">
                                <label for="Phone" class="text-xl ">Phone Number</label>
                            </div>
                            <InputText class="w-full" placeholder="+123 456 789" />
                        </div>
                        <div class="w-full lg:w-1/2 px-2">
                            <div class="mb-2 mt-4">
                                <label for="Email" class="text-xl">Email</label>
                            </div>
                            <InputText class="w-full" placeholder="example@gmail.com" />
                        </div>
                        <div class="w-full lg:w-1/2 px-2">
                            <div class="mb-2 mt-4">
                                <label for="City" class="text-xl">City</label>
                            </div>
                            <InputText class="w-full" placeholder="Hawthorne" />
                        </div>
                        <div class="w-full lg:w-1/2 px-2">
                            <div class="mb-2 mt-4">
                                <label for="State" class="text-xl">State</label>
                            </div>
                            <InputText class="w-full" placeholder="example@gmail.com" />
                        </div>
                        <div class="w-full lg:w-1/2 px-2">
                            <div class="mb-2 mt-4">
                                <label for="ZIP" class="text-xl">ZIP</label>
                            </div>
                            <div class="flex">
                                <InputText class="w-2/3" placeholder="e.g. 03924" />
                                <select id="sort-by" class="border rounded p-3 w-1/3 ml-2">
                                    <option value="California">CA</option>
                                    <option value="New York">NY</option>
                                    <option value="Houston">HO</option>
                                    <option value="Chicago">CH</option>
                                </select>
                            </div>
                        </div>
                        <div class="w-full px-2">
                            <div class="mb-2 mt-4">
                                <label for="Address" class="text-xl">Address</label>
                            </div>
                            <InputText class="w-full" placeholder="e.g. 4796 Libby Street" />
                        </div>
                    </div>
                </div>
            </div>

            <div class=" mb-4">
                <div class="flex items-center justify-between px-4 py-2">
                    <div class="text-2xl mt-4">Schedule Delivery</div>
                    <div class="card">
                        <InputSwitch v-model="checked" />
                    </div>
                </div>
                <div class="px-4 pb-4">
                    <div class="mb-2">
                        <label for="Address" class="text-xl">Notes</label>
                    </div>
                    <InputText class="w-full" :disabled="!checked" />
                    <div class="mt-4">
                        <div class="mb-2">
                            <label for="Address" class="text-xl">Dates</label>
                        </div>
                        <Calendar v-model="dates" selectionMode="range" :manualInput="false" placeholder="Type your note"
                            dateFormat="dd/mm/yy" class="w-full" :disabled="!checked" />
                    </div>
                </div>
            </div>

            <div class="">
                <div class="flex items-center justify-between px-4 py-2">
                    <div class="text-2xl mt-4 mb-2">Payment Method</div>
                </div>
                <div class="px-4 py-4 flex justify-evenly">
                    <div class="flex items-center">
                        <RadioButton v-model="ingredient" inputId="ingredient1" name="OnlinePayment"
                            value="OnlinePayment" />
                        <label for="ingredient1" class="ml-2">Online Payment</label>
                    </div>
                    <div class="flex items-center">
                        <RadioButton v-model="ingredient" inputId="CashOnDelivery" name="pizza" value="CashOnDelivery" />
                        <label for="ingredient2" class="ml-2">Cash On Delivery</label>
                    </div>
                    <div class="flex items-center">
                        <RadioButton v-model="ingredient" inputId="ingredient3" name="POSonDelivery"
                            value="POSonDelivery" />
                        <label for="ingredient3" class="ml-2">POS on Delivery</label>
                    </div>
                </div>
            </div>
        </div>
        <!-- Left column End -->

        <!-- Right column start -->
        <div class="lg:w-4/12 mx-4 mt-8 ">
            <div class=" mb-4">
                <div class="px-4 py-2 justify-items-center mt-2 mb-6">
                    <div class="flex justify-between">
                        <div class="font-light text-lg">Subtotal</div>
                        <div class="font-bold">$1250.32</div>
                    </div>
                    <div class="border-b "></div>
                    <div class="mt-2">
                        <div class="flex justify-between">
                            <div class="font-light text-lg">Shipping</div>
                            <div class="font-bold">---</div>
                        </div>
                    </div>
                    <div class="border-b "></div>
                    <div class="mt-2">
                        <div class="flex justify-between">
                            <div class="font-light text-lg">Total(USD)</div>
                            <div class="font-bold">$1250.32</div>
                        </div>
                    </div>
                    <hr>
                    <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold mt-4 mb-4 rounded w-full h-12"
                        type="submit">
                        Confirm Order
                    </button>
                </div>
                <div class="">
                    <div class="text-2xl ml-4 mb-2 ">Order Summary</div>
                </div>
                <div class="px-4 pb-4 overflow-y-auto max-h-[679px]">
                    <div v-for="product in products" :key="product.id" class="mb-1 flex flex-wrap">
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
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- Right column End -->
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import RadioButton from 'primevue/radiobutton';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Button from 'primevue/button';
// import InputNumber from 'primevue/inputnumber';
const checked = ref(false);
const dates = ref();
const ingredient = ref('');

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
</script>
  

