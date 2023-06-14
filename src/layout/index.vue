<script setup lang="ts">
import ATHeader from '@/components/Layout/ATHeader.vue';
import ATFooter from '@/components/Layout/ATFooter.vue';
</script>

<template>
    <div class="w-screen h-screen">
        <header>
            <ATHeader/>
        </header>
        <main>
            <router-view />
        </main>
        <footer>
            <ATFooter />
        </footer>
    </div>
</template>
