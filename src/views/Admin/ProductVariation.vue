<template>
    <div>
        <div class="flex font-bold text-4xl justify-center mb-4">ProductVariation</div>
        <div class=" mb-4">
            <div class="flex justify-between ml-2 mr-4">
                <div class="w-1/2 ml-2 mr-2">
                    <Dropdown v-model="selectedColor" :options="colors" optionLabel="value" placeholder="Select color"
                        class="w-full md:w-14rem" />
                </div>
                <div class="w-1/2 ml-2">
                    <Dropdown v-model="selectedProduct" :options="products" optionLabel="name"
                        placeholder="Select a product name" class="w-full md:w-14rem" />
                </div>
            </div>
            <div class="flex ml-4 mr-4">
                <div class="mt-4">
                    <Button @click="handleSaveProductVariation" type="submit" label="Save"
                        class="w-full text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
                </div>

                <div class="ml-2 mt-4">
                    <Button @click="handleRefresh" type="submit" label="Reset"
                        class="w-full text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
                </div>
            </div>
        </div>
        <div class="border-b border-gray-400"></div>
        <div class=" mb-4 mt-12">
            <!--ProductVariation-->
            <div class="account-management__user-accounts">
                <div class="flex justify-center">
                    <h2 class="text-3xl font-semibold">ProductVariation list</h2>
                </div>
                <DataTable :value="productVariations" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
                    <Column field="productVariationId" header="ProductVariation Id"></Column>
                    <Column field="color.value" header="Color Id"></Column>
                    <Column field="product.name" header="Product Id"></Column>
                    <!-- Add more columns as needed -->
                    <Column header="Tools">
                        <template #body="rowData">
                            <div class="brand-list__actions">
                                <Button @click="showDeleteDialog(rowData.data)" icon="pi pi-trash"
                                    class="p-button-rounded p-button-danger"></Button>
                            </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <Dialog v-model="deleteDialogVisible" :visible="deleteDialogVisible" :closable="false">
                <div class="flex justify-center text-2xl font-bold mt-4 mb-2 ">Xác nhận xóa</div>
                <div class="text-2xl">Bạn có chắc chắn muốn xóa sản phẩm này?</div>

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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import Textarea from 'primevue/textarea';
// import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
// import InputText from 'primevue/inputtext';
// import TabView from 'primevue/tabview';
// import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
//import useProductStore from '@/store/ProductStore';
import { ProductType, CreationParams, UpdateAdminParams } from '@/types/product';
// import { BrandType } from '@/types/brand';
// import { CategoryType } from '@/types/category';
import { ColorType } from '@/types/color';
import { ProductVariationType, CreationProductVariationParams } from '@/types/productVariation';
// import useBrandStore from '@/store/BrandStore';
// import useCategoryStore from '@/store/CategoryStore';
import useColorStore from '@/store/ColorStore';
import useProductAdminStore from '@/store/ProductAdminStore';
import useProductVariationAdminStore from '@/store/ProductVariationAdminStore';
import { ref, onMounted, computed } from 'vue';

const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);

const productStore = useProductAdminStore();
const products = ref<ProductType[]>([]);
//const currentProduct = ref<ProductType>({});
const selectedProduct = ref<ProductType | null>(null);

/*--ProductVariation: select color--*/
const colorStore = useColorStore();
const colors = ref<ColorType[]>([]);
const selectedColor = ref(null);

const productVariationStore = useProductVariationAdminStore();
const productVariations = ref<ProductVariationType[]>([]);
const currentProductVariation = ref<ProductVariationType>({});

/*--Insert productVariation in admin page--*/
const handleSaveProductVariation = async () => {
    try {
        // Lấy giá trị từ các select box
        const selectedColorValue = selectedColor.value;
        const selectedProductValue = selectedProduct.value;

        // Kiểm tra xem giá trị đã được chọn hay chưa
        if (!selectedColorValue || !selectedProductValue) {
            throw new Error("Brand and category must be selected.");
        }

        // Gán giá trị vào product.value
        currentProductVariation.value.color = selectedColorValue;
        currentProductVariation.value.product = selectedProductValue;
        console.log(currentProductVariation.value.color);
        console.log(currentProductVariation.value.product);
        await productVariationStore.addProductVariation(currentProductVariation.value as CreationProductVariationParams);
        // Xử lý phản hồi từ API ở đây (ví dụ: hiển thị thông báo thành công, cập nhật dữ liệu, vv.)
        await productVariationStore.fetchAllProductVariationsAdmin();
        console.log('ProductVariation created successfully!');
    } catch (error) {
        // Xử lý lỗi khi gọi API (ví dụ: hiển thị thông báo lỗi, ghi log lỗi, vv.)
        console.error('Error creating ProductVariation:', error);
    }
    selectedColor.value = null;
    selectedProduct.value = null;
    dialogVisible.value = false;
};


onMounted(async () => {
    /*--Load ProductVariations into table--*/
    try {
        await productVariationStore.fetchAllProductVariationsAdmin();
        productVariations.value = productVariationStore.getproductVariations.value;
    } catch (error) {
        console.log("Error fetching productVariation", error);
    }
    /*--Load colors into select box--*/
    try {
        await colorStore.fetchAllColor();
        colors.value = colorStore.getColors.value;
        console.log(colors);
    } catch (error) {
        console.log("Error fetching color", error);
    }
    /*--Load Products into select box--*/
    try {
        await productStore.fetchAllProductsAdmin();
        products.value = productStore.getProducts.value;
        console.log(products);
    } catch (error) {
        console.error('Error fetching products', error);
    }

});

/*--Refresh select box--*/
const handleRefresh = async () => {
    selectedColor.value = null;
    selectedProduct.value = null;
}

/*--Cancel layout modal delete confirm--*/
const cancelDelete = () => {
    currentProductVariation.value = {};
    deleteDialogVisible.value = false;
};

/*--Show modal confirm--*/
const showDeleteDialog = (productVariation: ProductVariationType) => {
    currentProductVariation.value = { ...productVariation };
    deleteDialogVisible.value = true;
};

/*--Delete productVariation in admin page--*/
const handleDelete = async () => {
    try {
        await productVariationStore.deleteProductVariation(currentProductVariation.value.productVariationId);
        console.log(currentProductVariation.value.productVariationId)
        await productVariationStore.fetchAllProductVariationsAdmin();
        productVariations.value = productVariationStore.getproductVariations.value;
    } catch (error) {
        console.error('Error deleting productVariation:', error);
    }
    currentProductVariation.value = {};
    deleteDialogVisible.value = false;
}

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
