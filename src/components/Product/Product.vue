<template>
    <Card class="p-4">
        <template #header>
            <a href="">
                <img alt="user header"
                    src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg"
                    class="zoom-image" />
            </a>
        </template>
        <template #title>{{ product.name }}</template>
        <template #subtitle>Puma - <span class="text-lg font-bold">${{ product.price.toFixed(2) }}</span></template>
        <template #content>{{ product.description }}</template>
        <template #footer>
            <div class="flex items-center ">
                <div class="mr-4">
                    <Button label="Add to cart" icon="pi pi-shopping-cart" />
                </div>
                <div>
                    <Button icon="pi pi-heart" severity="secondary" />
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">

</script>