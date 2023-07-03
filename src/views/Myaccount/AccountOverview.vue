<template>
    <div class="ml-4 mr-4 mt-4 mb-4">
        <div class="text-2xl">Xin chào, tên</div>
        <div class="my-4">You are logged in as Annoynimous</div>
        <div class="border">
            <div class="my-4 font-bold text-2xl ml-4">{{ $t('info') }}</div>
            <div class="flex">
                <div class="w-1/3">
                    <div class="my-4 text-xl ml-4">{{ $t('paymentinfo') }}</div>
                    <div class="my-4 ml-4">No address available</div>
                    <a class="my-4 font-bold text-xl ml-4" href="#">{{ $t('newadd') }}</a>
                </div>
                <div class="w-1/3">
                    <div class="my-4 text-xl">{{ $t('address') }}</div>
                    <div class="mb-4">No card set as primary</div>
                    <a class="my-4 font-bold text-xl" href="">{{ $t('newcard') }}</a>
                </div>
                <div class="w-1/3">
                    <div class="my-4 text-xl mb-4">{{ $t('accountinfo') }}</div>
                    <div>Name</div>
                    <div>a@gmail.com</div>
                    <div>******</div>
                    <div class="mb-4">
                        <a class="my-4 font-bold text-xl" href="">{{ $t('manageaccount') }}</a>
                    </div>
                    <div class="mb-4">
                        <a class="my-4 font-bold text-xl" href="">{{ $t('manageemail') }}</a>
                    </div>
                </div>

            </div>
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
import { useLanguageStore } from '@/store/language';
import { translate } from '@/i18n';

const $t = translate;
const languageStore = useLanguageStore();

</script>

<style>
.inputSearch {
    width: 30%;
}
</style>