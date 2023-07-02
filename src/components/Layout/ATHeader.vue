<template>
  <nav>
    <div class="flex items-center justify-between px-6">
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
          <Button v-if="!isLogin" label="Sign In / Register" class="sign-in-register-btn" text
            @click="dialogSignInVisible = true" />
          <button label="My Account" class="sign-in-register-btn" text @click="toggleSection('myAccount')">
            <div class="mb-3">
              <span v-if="showMyAccountSection">
                <span class="font-bold">My Account</span>
                <i class="pi pi-chevron-down ml-2"></i>
              </span>
              <span v-else>
                <span class="font-bold">My Account</span>
                <i class="pi pi-chevron-up ml-2"></i>
              </span>
            </div>
            <div :class="['my-account-section', { 'hidden': !showMyAccountSection }]">
              <div class="mb-2 flex justify-start">
                <Button label="View order" class="sign-in-register-btn" text @click="goToViewOrders" />
              </div>
              <div class="mb-2 flex justify-start">
                <Button label="My Account" class="sign-in-register-btn" text @click="goToMyAccount" />
              </div>
              <div v-if="isAdmin" class="mb-2 flex justify-start">
                <Button label="Admin" class="sign-in-register-btn" text />
              </div>
              <div v-if="isLogin" class="mb-2 flex justify-start">
                <Button label="Logout" class="sign-in-register-btn" text @click="logout" />
              </div>
            </div>
          </button>
        </template>
      </MegaMenu>
    </div>
  </nav>
  <Sidebar v-model:visible="dialogCartVisible" position="right">
    <p>My Cart</p>
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
import jwt_decode from "jwt-decode";

enum MainCategories {
  Men = 1,
  Women = 2,
  Kids = 3
}

const router = useRouter();
const { getUser } = useAccountStore();
const { getBrands, fetchBrands } = useBrandStore();
const { getCategories, fetchCategories } = useCategoryStore();
let selectedProduct = ref();
let filteredProducts = ref([]);
let dialogCartVisible = ref(false);
let dialogSignInVisible = ref(false);

function brands() {
  return getBrands.value.map(brand => {
    return {
      label: brand.name,
      command: () => gotoProductList(brand.brandId, undefined)
    }
  });
}

const getAllBrands = () => {
  return [{
    label: "Our brands",
    items: brands(),
  }]
};

const getSubCategories = (parentCategoryId: number, categoryCode: string) => {
  let data = getCategories.value.map(category => {
    const localParentCategoryId = category.parentCategory?.categoryId;
    const localCategoryCode = category.code;
    if (localParentCategoryId === parentCategoryId && localCategoryCode === categoryCode) {
      return {
        label: category.name,
        command: () => gotoProductList(undefined, category.categoryId)
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
      label: "Nữ",
      items: [getCategoriesByParent(MainCategories.Women)],
    },
    {
      label: "Nam",
      items: [getCategoriesByParent(MainCategories.Men)],
    },
    {
      label: "Trẻ Em",
      items: [getCategoriesByParent(MainCategories.Kids)],
    },
    {
      label: "Thường Hiệu",
      items: [getAllBrands()],
    },
  ];
}

const fetchData = () => {
  Promise.all([fetchBrands(), fetchCategories()]).then(() => {
    setDataHeader();
  });
}

const goToLogin = () => {
  router.push('/account/login');
}

function goToCart() {
  dialogCartVisible.value = false;
  router.push('/cart');
}

const goToRegister = () => {
  router.push('/account/register')
}

const gotoProductList = (brand?: number, category?: number) => {
  router.push({
    name: "Products",
    query: { category: category, brand: brand },
  });
};

onMounted(fetchData);

function goToCheckout() {
  dialogCartVisible.value = false;
  router.push('/checkout');
}

function goToMyAccount() {
  dialogCartVisible.value = false;
  router.push('/myaccount');
}

function goToViewOrders() {
  dialogCartVisible.value = false;
  router.push('/myaccount/view-order');
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
const token = localStorage.getItem('token');

const isLogin = ref(false);
let isAdmin = ref(false);

function checkToken() {
  if (token == null) {
    isLogin.value = false;
  } else {
    isLogin.value = true;
    const valueToken = jwt_decode(token!);
    const roles = valueToken.user.roles;
    console.log(roles);
    isAdmin.value = roles.some(role => role.authority === 'admin');
    console.log(isAdmin.value);
  }
}

const logout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};
checkToken();
</script>
