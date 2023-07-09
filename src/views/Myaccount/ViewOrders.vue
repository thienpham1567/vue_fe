<template>
    <div class="ml-4 mr-4 mt-4 mb-4">
        <div class="text-2xl">{{ $t('odh') }}</div>
        <div class="my-4">You are logged in as an.chantroimoi@gmail.com</div>
        <div class="">
            <div class="">
                <div class="mb-2">{{ $t('des') }}</div>
                <div class=" p-inputgroup w-2/5 inputSearch mb-4">
                    <InputText placeholder="Keyword" />
                    <Button label="Search order" />
                </div>

                <div class="text-xl">{{ $t('text') }}</div>

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
    width: 40%;
}
</style>



