<template>
    <nav>
        <div class="flex items-center justify-between px-4">
            <div class="flex items-center">
                <Image :src="Logo" alt="Image" width="250" />
                <div class="p-inputgroup w-96">
                    <AutoComplete v-model="selectedProduct" optionLabel="name" :suggestions="filteredProducts"
                        @complete="search" placeholder="Search for shoes, clothes, etc.">
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
            <Button icon="pi pi-shopping-cart" class="cart-btn" label="MY CART" raised />
        </div>
    </nav>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import Button from 'primevue/button';
import AutoComplete from 'primevue/autocomplete';
import Logo from "@/assets/images/logo.png"
import { ref } from 'vue';

const selectedProduct = ref();
const filteredProducts = ref([]);

function search() {

}
</script>
