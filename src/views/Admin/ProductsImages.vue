<template>
    <div>
        <div class="flex font-bold text-4xl justify-center mb-4">Product Image</div>
        <div class=" mb-4">
            <div class="flex justify-between ml-2 mr-4">
                <div class="w-full ml-2 mr-2">
                    <Dropdown v-model="selectedProductVariation" :options="productVariationWithLabel" optionLabel="label"
                        placeholder="Select a product variation" class="w-full md:w-14rem">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex align-items-center">
                                <div>{{ slotProps.value.color.value }}</div>
                                <div class="mx-1"> - </div>
                                <div>{{
                                    slotProps.value.product.name }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                    </Dropdown>
                </div>
            </div>
            <div class="mr-4 ml-4 mt-4">
                <label for="description">Description</label>
                <div class="card flex justify-content-center">
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="ingredient" inputId="ingredient1" name="PrimaryImg" value="IsPrimary" />
                            <label for="ingredient1" class="ml-2">Is Primary</label>
                        </div>
                        <div class="flex align-items-center">
                            <RadioButton v-model="ingredient" inputId="ingredient2" name="PrimaryImg" value="NotPrimary" />
                            <label for="ingredient2" class="ml-2">Not Primary</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex">
                <div class="mr-4 ml-4 mt-4 w-1/4">
                    <label for="SKU-Code">Primary Image URL</label>
                    <InputText v-model="currentImageURL" class="w-full" placeholder="" />
                </div>
                <div class="mr-4 ml-4 mt-4 w-1/4">
                    <label for="SKU-Code">Sub Image URL</label>
                    <InputText v-model="currentImageURL" class="w-full" placeholder="" />
                </div>
                <div class="mr-4 ml-4 mt-4 w-1/4">
                    <label for="SKU-Code">Sub Image URL</label>
                    <InputText v-model="currentImageURL" class="w-full" placeholder="" />
                </div>
                <div class="mr-4 ml-4 mt-4 w-1/4">
                    <label for="SKU-Code">Sub Image URL</label>
                    <InputText v-model="currentImageURL" class="w-full" placeholder="" />
                </div>
                <div class="mr-4 ml-4 mt-4 w-1/4">
                    <label for="SKU-Code">Sub Image URL</label>
                    <InputText v-model="currentImageURL" class="w-full" placeholder="" />
                </div>
            </div>
            <div class="flex">
                <div class="ml-4 mr-4 mt-4 justify-content-center w-1/4">
                    <Image
                        src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5b6a5443f3e943889b15ae98018334fe_9366/TERREX_Free_Hiker_2_GORE-TEX_Hiking_Shoe_Red_GZ3311_01_standard.jpg"
                        alt="Image" width="210" preview />
                </div>
                <div class="ml-4 mr-4 mt-4 justify-content-center w-1/4">
                    <Image
                        src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/09593e0933c4411cb671ae9801834636_9366/TERREX_Free_Hiker_2_GORE-TEX_Hiking_Shoe_Red_GZ3311_02_standard_hover.jpg"
                        alt="Image" width="210" preview />
                </div>
                <div class="ml-4 mr-4 mt-4 justify-content-center w-1/4">
                    <Image
                        src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/d5cc172499d343f48e28ae9801834e57_9366/TERREX_Free_Hiker_2_GORE-TEX_Hiking_Shoe_Red_GZ3311_03_standard.jpg"
                        alt="Image" width="210" preview />
                </div>
                <div class="ml-4 mr-4 mt-4 justify-content-center w-1/4">
                    <Image
                        src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fd27b9307f594fceb237ae9801837d1f_9366/TERREX_Free_Hiker_2_GORE-TEX_Hiking_Shoe_Red_GZ3311_09_standard.jpg"
                        alt="Image" width="210" preview />
                </div>
                <div class="ml-4 mr-4 mt-4 justify-content-center w-1/4">
                    <Image
                        src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/42f446151e6e4d02b08dae9801835e37_9366/TERREX_Free_Hiker_2_GORE-TEX_Hiking_Shoe_Red_GZ3311_05_standard.jpg"
                        alt="Image" width="210" preview />
                </div>
            </div>
            <div class="flex ml-4 mr-4">
                <div class="mt-4">
                    <Button @click="handleSave" type="submit" label="Save"
                        class="w-full text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
                </div>
                <div class="ml-2 mt-4">
                    <Button @click="handleUpdate" type="submit" label="Update"
                        class="w-full text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
                </div>
                <div class="ml-2 mt-4">
                    <Button type="submit" label="Reset"
                        class="w-full text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
                </div>
            </div>
        </div>
        <div class="border-b border-gray-400"></div>
        <div class=" mb-4 mt-6">
            <div class="product-list__table">
                <div class="flex justify-center mb-6">
                    <h2 class="text-3xl font-semibold">Product Image list</h2>
                </div>
                <DataTable :value="productImages" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
                    <Column field="productImageld" header="Product Image Id"></Column>
                    <Column field="imageUrl" header="Image URL"></Column>
                    <Column field="isPrimary" header="Is Primary"></Column>
                    <Column field="productVariation.productVariationId" header="Product Variation Id"></Column>

                    <!-- Add more columns as needed -->
                    <Column header="Tools">
                        <template #body="rowData">
                            <div class="product-list__actions">
                                <Button @click="editData(rowData)" icon="pi pi-pencil"
                                    class=" p-button-rounded p-button-success"></Button>
                                <Button @click="showDeleteDialog(rowData.data)" icon="pi pi-trash"
                                    class="p-button-rounded p-button-danger"></Button>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>

            <Dialog v-model="deleteDialogVisible" :visible="deleteDialogVisible" header="Xác nhận xóa" :closable="false"
                class="product-list__dialog">
                <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>

                <template #footer>
                    <div class="product-list__dialog-buttons">
                        <Button class="p-button-danger" label="Xóa" @click="handleDelete"></Button>
                        <Button class="p-button-secondary" label="Hủy" @click="cancelDelete"></Button>
                    </div>
                </template>
            </Dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import Image from 'primevue/image';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import RadioButton from 'primevue/radiobutton';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';

import { ref, onMounted, computed } from 'vue';
import useProductImageAdminStore from '@/store/ProductImageAdminStore';
import useProductVariationAdminStore from '@/store/ProductVariationAdminStore';
import { ProductImagesType } from '@/types/productImages';
import { ProductVariationType } from '@/types/productVariation';

//---------------------------------------
const ingredient = ref('');
//---------------------------------------

const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);

const productImageStore = useProductImageAdminStore();
const productImages = ref<ProductImagesType[]>([]);
//const currentProductImage = ref<ProductImagesType>({});

/*--Fill productVariation into selectbox--*/
const productVariationStore = useProductVariationAdminStore();
const productVariations = ref<ProductVariationType[]>([]);
const selectedProductVariation = ref<ProductVariationType | null>(null);
const productVariationWithLabel = computed(() =>
    productVariationStore.getproductVariations.value.filter(productVariation => productVariation.productVariationId !== null).map((productVariation) => ({
        ...productVariation,
        label: `${productVariation.color?.value} - ${productVariation.product?.name}`
    }))
);

onMounted(async () => {
    /*--Load ProductImage into table--*/
    try {
        await productImageStore.fetchAllProductImagesAdmin();
        productImages.value = productImageStore.getproductImages.value;
    } catch (error) {
        console.log("Error fetching productImage", error);
    }

    /*--Load ProductVariation into select box--*/
    try {
        await productVariationStore.fetchAllProductVariationsAdmin();
        productVariations.value = productVariationStore.getproductVariations.value;
    } catch (error) {
        console.log('Error fetching productVariations', error);
    }

});


// const handleUpdate = async () => {
//     try {
//         const selectedBrandValue = selectedBrand.value;
//         const selectedCategoryValue = selectedCategory.value;
//         // Kiểm tra xem giá trị đã được chọn hay chưa
//         if (!selectedBrandValue || !selectedCategoryValue) {
//             throw new Error("Brand and category must be selected.");
//         }
//         // Gán giá trị vào product.value
//         currentProduct.value.brand = selectedBrandValue;
//         currentProduct.value.category = selectedCategoryValue;
//         await productStore.updateProduct(currentProduct.value.productId, currentProduct.value as UpdateAdminParams);
//         await productStore.fetchAllProductsAdmin();
//         products.value = productStore.getProducts.value;
//     } catch (error) {
//         console.error('Error updating product:', error);
//     }
// }
// const handleSave = async () => {
//     try {
//         // Lấy giá trị từ các select box
//         const selectedBrandValue = selectedBrand.value;
//         const selectedCategoryValue = selectedCategory.value;

//         // Kiểm tra xem giá trị đã được chọn hay chưa
//         if (!selectedBrandValue || !selectedCategoryValue) {
//             throw new Error("Brand and category must be selected.");
//         }

//         // Gán giá trị vào product.value
//         currentProduct.value.brand = selectedBrandValue;
//         currentProduct.value.category = selectedCategoryValue;
//         await productStore.addProduct(currentProduct.value as CreationParams);
//         console.log(currentProduct.value)
//         // Xử lý phản hồi từ API ở đây (ví dụ: hiển thị thông báo thành công, cập nhật dữ liệu, vv.)
//         await productStore.fetchAllProductsAdmin();
//         console.log('Product created successfully!');
//     } catch (error) {
//         // Xử lý lỗi khi gọi API (ví dụ: hiển thị thông báo lỗi, ghi log lỗi, vv.)
//         console.error('Error creating product:', error);
//     }

//     currentProduct.value = {};
//     selectedBrand.value = null;
//     selectedCategory.value = null;
//     dialogVisible.value = false;
// };
// const cancelDelete = () => {
//     currentProduct.value = {};
//     deleteDialogVisible.value = false;
// };

// const showDeleteDialog = (product: ProductType) => {
//     currentProduct.value = { ...product };
//     deleteDialogVisible.value = true;
// };
// const handleDelete = async () => {
//     try {
//         await productStore.deleteProduct(currentProduct.value.productId);
//         await productStore.fetchAllProductsAdmin();
//         products.value = productStore.getProducts.value;
//     } catch (error) {
//         console.error('Error deleting product:', error);
//     }
//     currentProduct.value = {};
//     deleteDialogVisible.value = false;
// }

// const editData = (rowData: { data: ProductType }) => {
//     selectedProduct.value = { ...rowData.data };

//     // Find the selected brand based on brandId
//     selectedBrand.value = brands.value.find(
//         brand => brand.brandId === selectedProduct.value.brand.brandId
//     );

//     // Find the selected category based on categoryId
//     selectedCategory.value = categories.value.find(
//         category => category.categoryId === selectedProduct.value.category.categoryId
//     );

//     currentProduct.value = { ...selectedProduct.value };
// };

</script>

<style>
.description-cell {
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.product-list__table {
    margin-bottom: 2rem;
}

.product-list__actions {
    display: flex;
    gap: 10px;
}

.product-list__dialog {
    width: 30rem;
}

.product-list__dialog-buttons {
    display: flex;
    justify-content: flex-end;
}
</style>
