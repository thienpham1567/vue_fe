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
      <Button label="Create your atsport account" class="btn" size="small" outlined
        @click="goToRegister" />
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
    label: 'Videos',
    items: [
      [
        {
          label: 'Video 1',
          items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }]
        },
        {
          label: 'Video 2',
          items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }]
        }
      ],
      [
        {
          label: 'Video 3',
          items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }]
        },
        {
          label: 'Video 4',
          items: [{ label: 'Video 4.1' }, { label: 'Video 4.2' }]
        }
      ]
    ]
  },
  {
    label: 'Users',
    items: [
      [
        {
          label: 'User 1',
          items: [{ label: 'User 1.1' }, { label: 'User 1.2' }]
        },
        {
          label: 'User 2',
          items: [{ label: 'User 2.1' }, { label: 'User 2.2' }]
        }
      ],
      [
        {
          label: 'User 3',
          items: [{ label: 'User 3.1' }, { label: 'User 3.2' }]
        },
        {
          label: 'User 4',
          items: [{ label: 'User 4.1' }, { label: 'User 4.2' }]
        }
      ],
      [
        {
          label: 'User 5',
          items: [{ label: 'User 5.1' }, { label: 'User 5.2' }]
        },
        {
          label: 'User 6',
          items: [{ label: 'User 6.1' }, { label: 'User 6.2' }]
        }
      ]
    ]
  },
  {
    label: 'Events',
    items: [
      [
        {
          label: 'Event 1',
          items: [{ label: 'Event 1.1' }, { label: 'Event 1.2' }]
        },
        {
          label: 'Event 2',
          items: [{ label: 'Event 2.1' }, { label: 'Event 2.2' }]
        }
      ],
      [
        {
          label: 'Event 3',
          items: [{ label: 'Event 3.1' }, { label: 'Event 3.2' }]
        },
        {
          label: 'Event 4',
          items: [{ label: 'Event 4.1' }, { label: 'Event 4.2' }]
        }
      ]
    ]
  },
]);

function search() {

}

function goToLogin() {
  router.push('/account/login');
}

function goToRegister() {
  router.push('/account/register')
}
</script>
