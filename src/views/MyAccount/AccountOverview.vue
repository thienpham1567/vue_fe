<template>
    <div class="ml-4 mr-4 mt-4 mb-4">
        <div class="text-2xl">Xin chào, tên</div>
        <div class="my-4">You are logged in as an.chantroimoi@gmail.com</div>
        <div class="border">
            <div class="my-4 font-bold text-2xl ml-4">Your Primary Account Information</div>
            <div class="flex">
                <div class="w-1/3">
                    <div class="my-4 text-xl ml-4">Primary Shipping Address</div>
                    <div class="my-4 ml-4">No address available</div>
                    <a class="my-4 font-bold text-xl ml-4" href="#">ADD A NEW SHIPPING ADDRESS</a>
                </div>
                <div class="w-1/3">
                    <div class="my-4 text-xl">Primary Payment Information</div>
                    <div class="mb-4">No card set as primary</div>
                    <a class="my-4 font-bold text-xl" href="">ADD A NEW CARD</a>
                </div>
                <div class="w-1/3">
                    <div class="my-4 text-xl mb-4">Name, Email & Password</div>
                    <div>Name</div>
                    <div>a@gmail.com</div>
                    <div>******</div>
                    <div class="mb-4">
                        <a class="my-4 font-bold text-xl" href="">MANAGE ACCOUNT INFO</a>
                    </div>
                    <div class="mb-4">
                        <a class="my-4 font-bold text-xl" href="">MANAGE EMAIL SUBSCRIPTIONS</a>
                    </div>
                </div>

            </div>
        </div>
        <div class="text-2xl mt-4">
            <div class="mb-4">Your Order History</div>
            <div class="mb-2 text-base">Search items in your order history</div>
            <div class="p-inputgroup w-2/5 inputSearch mb-4">
                <InputText placeholder="Keyword" />
                <Button label="Search order" />
            </div>

            <div>Your order history is empty.</div>

        </div>
    </div>
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
import InputText from 'primevue/inputtext';

</script>

<style>
.inputSearch {
    width: 30%;
}
</style>