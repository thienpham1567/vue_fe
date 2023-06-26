<template>
    <p>{{ $t('description') }}</p>
</template>

<script setup lang="ts">
import { useLanguageStore } from '@/store/language';
import { translate } from '@/i18n';

const languageStore = useLanguageStore();

const $t = translate;

console.log($t)
</script>