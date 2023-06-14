<script setup lang="ts">
import ATHeader from '@/components/Layout/ATHeader.vue';
import ATFooter from '@/components/Layout/ATFooter.vue';
import ProductList from '@/views/ProductList/ProductList.vue';
import ATAside from '@/components/Layout/ATAside.vue';
import supNav from '@/components/Layout/supNav.vue';
// import Login from '@/views/Login/Login.vue';
// import Registration from '@/views/Registration/Registration.vue';
</script>

<template>
    <!-- <Login /> -->
    <!-- <Registration /> -->
    <supNav />
    <div class="flex flex-wrap">
        <div class="w-full md:w-1/4 lg:w-1/6">
            <ATAside />
        </div>
        <div class="w-full md:w-3/4 lg:w-5/6">
            <ProductList />
        </div>
    </div>
    <ATFooter />
</template>
