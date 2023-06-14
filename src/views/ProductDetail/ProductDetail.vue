<template>
    <div class="container flex ml-4 mb-4 mt-4 overflow-x-hidden">
        <div class="w-full lg:w-9/12">
            <!-- Product Detail -->
            <div>
                <!-- Hình ảnh và nội dung sản phẩm -->
                <img src="https://assets.adidas.com/images/w_2000,h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg"
                    class="object-contain w-full" />
            </div>
        </div>

        <div class="w-full lg:w-3/12 bg-black ml-4 mr-4">
            <!-- Aside -->
            <aside class="sticky top-0">
                <!-- Nội dung thanh Aside -->
                <div class="flex flex-col h-full p-4">
                    <aside class="p-4 flex-grow rounded-lg md:w-64 lg:w-60 max-w-full">
                        <div class="mb-4"></div>
                        <div>
                            <!-- Nội dung thương hiệu -->
                        </div>

                        <div class="mb-4">
                            <button class="text-xl font-bold mx-auto block"></button>
                        </div>
                        <div>
                            <!-- Nội dung khoảng giá -->
                        </div>

                        <div class="mb-4">
                            <button class="text-xl font-bold mx-auto block">
                                <span>
                                    <i class="pi pi-chevron-down"></i>
                                </span>
                                <span>
                                    <i class="pi pi-chevron-up"></i>
                                </span>
                                Kích cỡ
                            </button>
                        </div>
                        <div class="mb-2">
                            <!-- Nội dung kích cỡ -->
                        </div>
                    </aside>
                </div>
            </aside>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    // Khai báo các props tại đây nếu cần
});

  // Thêm các biến hoặc hàm logic tại đây
</script>
  
<style scoped>
/* Thêm các luật CSS tùy chỉnh cho trang tại đây */


.max-w-full {
    max-width: 100%;
}
</style>