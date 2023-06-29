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
          <Button label="Sign In / Register" class="sign-in-register-btn" text @click="dialogSignInVisible = true" />
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

enum MainCategories {
  Men = 1,
  Women = 2,
  Kids = 3
}

const router = useRouter();
const { getUser, logout } = useAccountStore();
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
</script>
