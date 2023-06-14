<template>
    <div class=" flex ">
        <div class="w-full lg:w-9/12 ml-4 mr-4 mb-4">
            <!-- Product Detail -->
            <div class="flex flex-wrap">
                <!-- Hình ảnh và nội dung sản phẩm -->
                <div class="img1 my-4">
                    <img
                        src="https://assets.adidas.com/images/w_2000,h_840,c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                </div>
                <div class="flex mb-4">
                    <div class="img2 mr-4">
                        <img
                            src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                    </div>
                    <div class="img3">
                        <img
                            src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                    </div>
                </div>
                <div class="flex mb-4">
                    <div class="img2 mr-4">
                        <img
                            src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                    </div>
                    <div class="img3">
                        <img
                            src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                    </div>
                </div>
                <div class="flex ">
                    <div class="img2 mr-4">
                        <img
                            src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                    </div>
                    <div class="img3">
                        <img
                            src="https://assets.adidas.com/images/c_fill/f6dd32dd3f72407084c0af120100820d_9366/Forum_Bonega_Shoes_Beige_IF4829_01_standard.jpg" />
                    </div>
                </div>
            </div>
        </div>

        <div class=" lg:w-3/12 bg-gray-400 m-4">
            <!-- Aside -->
            <aside class="sticky">
                <div>
                    <div class="mb-2 flex justify-end">
                        <label for="puma" class="mr-2 text-base md:text-lg cursor-pointer">Puma</label>
                        <input type="checkbox" id="puma" value="puma" class="w-4 h-4 md:w-6 md:h-6 cursor-pointer" />
                    </div>
                    <div class="mb-2 flex justify-end">
                        <label for="adidas" class="mr-2 text-base md:text-lg cursor-pointer">Adidas</label>
                        <input type="checkbox" id="adidas" class="w-4 h-4 md:w-6 md:h-6 cursor-pointer " />
                    </div>
                    <!-- Thêm các checkbox thương hiệu khác nếu cần -->
                </div>

                <div class="mb-4">
                    <button class="text-xl font-bold mx-auto block">
                        <span>
                            <i class="pi pi-chevron-down"></i>
                        </span>
                        <span>
                            <i class="pi pi-chevron-up"></i>
                        </span>
                        Khoảng giá
                    </button>
                </div>
            </aside>
        </div>
    </div>
</template>
  
<script setup lang="ts">


  // Thêm các biến hoặc hàm logic tại đây
</script>
  
