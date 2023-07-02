<template>
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
                        <Button icon="pi pi-minus" class="p-button-secondary p-button-text mr-2" @click=""></Button>
                        <div class="bg-white w-12 flex justify-center items-center">{{ 1 }}</div>
                        <Button icon="pi pi-plus" class="p-button-secondary p-button-text ml-2" @click=""></Button>

                    </div>
                    <div class="mt-2">Remove</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from 'primevue/button';


</script>
