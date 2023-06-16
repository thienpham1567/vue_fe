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
        </template>
      </MegaMenu>
    </div>
  </nav>
  <CoreDialog :visible="dialogCartVisible" header="My Cart" widthSize='400px' position="right"
    @close-dialog="dialogCartVisible = false">
    <p>My Cart</p>
  </CoreDialog>

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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
let selectedProduct = ref();
let filteredProducts = ref([]);

let dialogCartVisible = ref(false);
let dialogSignInVisible = ref(false);

const items = ref([
  {
    label: "Women",
    items: search()
  },
  {
    label: "Men",
    items: [
      [
        {
          label: 'Video 1',
          items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }]
        },
        {
          label: 'Video 2',
          items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }]
        },
      ],
    ]
  },
  {
    label: "Kids",
    items: [
      [
        {
          label: 'Video 1',
          items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }]
        },
        {
          label: 'Video 2',
          items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }]
        },
      ],
    ]
  },
]);

function search() {
  return [
    [
      {
        label: 'Video 1',
        items: [{ label: 'Video 1.1', to: '/account/login' }, { label: 'Video 1.2' }]
      },
      {
        label: 'Video 2',
        items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }]
      },
    ],
  ];
}

function goToLogin() {
  router.push('/account/login');
}

function goToRegister() {
  router.push('/account/register')
}
function goToProductDetail() {
  router.push('/products/ProductDetail')
}
function goToProductList() {
  router.push('/products/ProductList')
}
</script>
