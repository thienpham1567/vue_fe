<template>
    <div class="flex items-center justify-between p-4">
        <div>
            <h2 class="text-xl font-bold">Your Search Results</h2>
            <p>97879 items found</p>
        </div>
        <div class="items-end align-middle">
            <label for="sort-by" class="mr-2 align-middle">Sort By:</label>
            <select id="sort-by" class="border rounded p-2 align-middle">
                <option value="relevance">Relevance</option>
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
                <option value="newest">Newest</option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>