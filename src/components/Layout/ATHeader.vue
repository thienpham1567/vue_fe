<template>
    <div class="flex items-center justify-between px-4">
        <div class="flex items-center">
            <Image :src="Logo" alt="Image" width="170" />
            <div class="p-inputgroup w-96">
                <InputText placeholder="Search for shoes, clothes, etc." />
                <Button icon="pi pi-search" severity="success" />
            </div>
        </div>
        <div>
            <Button icon="pi pi-shopping-cart" label="MY CART" severity="success" outlined />
        </div>
    </div>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import Button from 'primevue/button';
import InputText from 'primevue/InputText';
import Logo from "@/assets/images/logo.png"

</script>