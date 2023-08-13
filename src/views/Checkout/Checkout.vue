<template>
  <div>
        <Steps :model="items" aria-label="Form Steps" />

        <router-view v-slot="{Component}" :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import Steps from 'primevue/steps';
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const items = ref([
    {
        label: 'Information and Address',
        to: "/checkout/address"
    },
    {
        label: 'Payment Information',
        to: "/checkout/payment",
    },
    {
        label: 'Order Confirmation',
        to: "/checkout/confirmation",
    },
]);
const formObject = ref({});

const nextPage = (event) => {
    for (let field in event.formData) {
        formObject.value[field] = event.formData[field];
    }

    router.push(items.value[event.pageIndex + 1].to);
};
const prevPage = (event) => {
    router.push(items.value[event.pageIndex - 1].to);
};

</script>
