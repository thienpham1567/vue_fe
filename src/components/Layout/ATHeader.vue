<template>
  <nav>
    <div class="flex items-center justify-between px-4">
      <div class="flex items-center h-36">
        <Image :src="Logo" alt="Image" width="180" />
        <div class="p-inputgroup">
          <AutoComplete v-model="selectedProduct" optionLabel="name" :suggestions="filteredProducts" @complete="search"
            placeholder="Search for shoes, clothes, etc.">
            <!-- <template #option="slotProps">
                            <div class="flex align-options-center">
                                <img :alt="slotProps.option.name"
                                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                    :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
                                <div>{{ slotProps.option.name }}</div>
                            </div>
                        </template> -->
          </AutoComplete>
          <Button icon="pi pi-search" class="search-btn" />
        </div>
      </div>
      <Button icon="pi pi-shopping-cart" class="cart-btn" label="MY CART" raised @click="dialogCartVisible = true" />
    </div>
    <div class="nav-menu">
      <MegaMenu :model="items">
        <template #end>
          <Button class="sign-in-register-btn" text @click="goToProductDetail">ProductDetail</Button>
          <Button class="sign-in-register-btn" text @click="goToProductList">ProductList</Button>
          <Button label="Sign In / Register" class="sign-in-register-btn" text @click="dialogSignInVisible = true" />
          <Button label="Logout" class="sign-in-register-btn" text @click="logout" />
        </template>
      </MegaMenu>
    </div>
  </nav>
  <Sidebar v-model:visible="dialogCartVisible" position="right">
    <template #header>
      <div class="text-2xl">Added To Cart</div>
    </template>
    <div class="overflow-y-auto w-full h-5/6">
      <div class="mb-1 flex flex-wrap">
        <div class="rounded-lg flex w-full ml-4 mr-4">
          <div class="w-1/4 ">
            <img src="https://m.media-amazon.com/images/I/71qvDARKU3L._AC_SR1840,1472_.jpg"
              class="h-full w-full object-contain" />
          </div>
          <div class="w-2/4 ml-4">
            <div class="text-base font-light">Rebok Work</div>
            <div class="text-xl font-bold">Adidas</div>
            <div class="text-base font-light">Color: black</div>
            <div class="text-base font-light">Size: Men 12</div>
          </div>
          <div class="w-1/4">
            <div class="text-xl font-bold">$114</div>
            <div class="flex justify-center mt-2">
              <Button icon="pi pi-minus" class="p-button-secondary p-button-text mr-2"
                @click="decrement(products)"></Button>
              <div class="bg-white w-12 flex justify-center items-center">{{ products[0].quantity }}</div>
              <Button icon="pi pi-plus" class="p-button-secondary p-button-text ml-2"
                @click="increment(products)"></Button>

            </div>
            <div class="mt-2">Remove</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-200 w-full h-1/6">
      <div class="flex justify-end mr-4">Cart Subtotal (10 Items)$1,099.90</div>
      <div class="flex justify-between m-4 pb-4">
        <Button type="submit" label="VIEW CART" @click="goToCart"
          class="px-4 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
        <Button type="submit" label="PROCEED TO CHECKOUT" @click="goToCheckout"
          class="px-4 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
      </div>
    </div>
  </Sidebar>

  <CoreDialog :visible="dialogSignInVisible" header="Sign In" widthSize='500px' position="center"
    @close-dialog="dialogSignInVisible = false">
    <div class="sign-in-btns">
      <Button label="Sign in with atsport" class="btn" size="small" outlined @click="goToLogin" />
      <p class="text-center">or</p>
      <Button label="Create your atsport account" class="btn" size="small" outlined @click="goToRegister" />
    </div>
  </CoreDialog>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import MegaMenu from 'primevue/megamenu';
import Logo from "@/assets/images/logo.png";
import CoreDialog from '@/components/Core/CoreDialog.vue';
import Sidebar from 'primevue/sidebar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useBrandStore, useAccountStore, useCategoryStore } from "@/store";
import { onMounted } from 'vue';

enum MainCategories {
  Men = 1,
  Women = 2,
  Kids = 3
}

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

const router = useRouter();
const { getUser, logout } = useAccountStore();
const { getBrands, fetchBrands } = useBrandStore();
const { getCategories, getMainCategories, fetchCategories } = useCategoryStore();
let selectedProduct = ref();
let filteredProducts = ref([]);
let dialogCartVisible = ref(false);
let dialogSignInVisible = ref(false);

const getAllBrands = () => {
  return getBrands.value.map(brand => {
    return {
      label: brand.name,
    }
  });
};

const getSubCategories = (parentCategoryId: number, categoryCode: string) => {
  let data = getCategories.value.map(category => {
    const localParentCategoryId = category.parentCategory?.categoryId;
    const localCategoryCode = category.code;
    if (localParentCategoryId === parentCategoryId && localCategoryCode === categoryCode) {
      return {
        label: category.name,
      }
    }
  });
  return data.filter(category => category !== undefined);
}

const getCategoriesByParent = (parentCategoryId: number) => {
  let data = getCategories.value.map(category => {
    const localParentCategoryId = category.parentCategory?.categoryId;
    if (localParentCategoryId === parentCategoryId) {
      return {
        label: category.code,
        items: getSubCategories(parentCategoryId, category.code!),
      }
    }
  });

  return data.filter((value, index, categories) => categories.map(category => category?.label)?.indexOf(value?.label) === index && value !== undefined);
}

const items = ref([]);

const setDataHeader = () => {
  items.value = [
    {
      label: "Women",
      items: [getCategoriesByParent(MainCategories.Women)],
    },
    {
      label: "Men",
      items: [getCategoriesByParent(MainCategories.Men)],
    },
    {
      label: "Kids",
      items: [getCategoriesByParent(MainCategories.Kids)],
    },
    {
      label: "Brands",
      items: [getAllBrands()],
    },
  ];
}

const fetchData = async () => {
  await fetchBrands();
  await fetchCategories();
  setDataHeader();
}

const goToLogin = () => {
  router.push('/account/login');
}

function goToCart() {
  router.push('/products/cart');
}

const goToRegister = () => {
  router.push('/account/register')
}
function goToProductDetail() {
  router.push('/products/ProductDetail')
}
function goToProductList() {
  router.push('/products/ProductList')
}

function goToCheckout() {
  router.push('/checkout/Checkout');
}

onMounted(fetchData);
const increment = (products: Product) => {
  products.quantity++;
};

const decrement = (products: Product) => {
  if (products.quantity > 0) {
    products.quantity--;
  }
};

</script>


