<template>
    <div>
        <div class="flex font-bold text-4xl justify-center mb-4">Product Variation Size</div>
        <div class=" mb-4">
            <div class="flex justify-between ml-2 mr-4">
                <div class="w-1/2 ml-2 mr-2">
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
                <div class="w-1/2 ml-2">
                    <Dropdown v-model="selectedSize" :options="sizes" optionLabel="value" placeholder="Select a size"
                        class="w-full md:w-14rem">
                    </Dropdown>
                </div>
            </div>
            <div class="mr-4 ml-4 mt-4">
                <label for="SKU-Code">Quantity</label>
                <InputNumber v-model="currentProductVariationSize.quantity" class="w-full" placeholder="quantity" />
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
                    <Button @click="handleRefresh" type="submit" label="Reset"
                        class="w-full text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
                </div>
            </div>
        </div>
        <div class="border-b border-gray-400"></div>
        <div class=" mb-4 mt-12">
            <div class="product-list__table">
                <div class="flex justify-center">
                    <h2 class="text-3xl font-semibold">ProductVariation Sizes</h2>
                </div>
                <DataTable :value="productVariationSizes" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
                    <Column field="productVariationSizeId" header="ProductVariationSize Id"></Column>
                    <Column field="quantity" header="Quantity"></Column>
                    <Column field="productVariation.productVariationId" header="ProductVariation Id">
                        <template #body="rowData">
                            {{ getProductVariationName(rowData.data.productVariation.productVariationId) }}
                        </template>
                    </Column>
                    <Column field="size.value" header="Size id"></Column>
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
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
import { ProductType, UpdateAdminParams } from '@/types/product';
import useProductVariationAdminStore from '@/store/ProductVariationAdminStore';
import useProductVariationSizeAdminStore from '@/store/ProductVariationSizeAdminStore';
import useSizeStore from '@/store/SizeStore';
import { ref, onMounted, computed } from 'vue';
import { SizeType } from '@/types/size';
import { ProductVariationType } from '@/types/productVariation';
import { ProductVariationSizeType, UpdateParams, CreationProductVariationSizeParams } from '@/types/productVariationSize';
import { CreationParams } from '@/types/user';

const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);

/*--Fill ProductVariation into selectbox--*/
const productVariationStore = useProductVariationAdminStore();
const productVariations = ref<ProductVariationType[]>([]);
const selectedProductVariation = ref<ProductVariationType | null>(null);

/*--Fill productVariationSize to table--*/
const productVariationSizeStore = useProductVariationSizeAdminStore();
const productVariationSizes = ref<ProductVariationSizeType[]>([]);
const currentProductVariationSize = ref<ProductVariationSizeType>({});


// const currentProduct = ref<ProductType>({});
const selectedProductVariationSize = ref<ProductVariationSizeType | null>(null);

/*--Fill Size into selectbox--*/
const sizeStore = useSizeStore();
const sizes = ref<SizeType[]>([]);
const selectedSize = ref<SizeType | null>(null);
// const price = ref<number | null>(null);

const productVariationWithLabel = computed(() =>
    productVariationStore.getproductVariations.value.filter(productVariation => productVariation.productVariationId !== null).map((productVariation) => ({
        ...productVariation,
        label: `${productVariation.color?.value} - ${productVariation.product?.name}`
    }))
);

onMounted(async () => {

    /*--Load ProductVariationSize into table--*/
    try {
        await productVariationSizeStore.fetchAllProductVariationSizesAdmin();
        productVariationSizes.value = productVariationSizeStore.getproductVariationSizes.value;
    } catch (error) {
        console.log('Error fetching productVariationSize', error);
    }
    /*--ProductVariation--*/
    try {
        await productVariationStore.fetchAllProductVariationsAdmin();
        productVariations.value = productVariationStore.getproductVariations.value;
    } catch (error) {
        console.log('Error fetching productVariations', error);
    }
    /*--Size*/
    try {
        await sizeStore.fetchSizes();
        sizes.value = sizeStore.getSizes.value;
    } catch (error) {
        console.log('Error fetching sizes', error);
    }

});

// Tính toán productVariationWithLabel
const productVariationsWithLabel = computed(() =>
    productVariations.value
        .filter(productVariation => productVariation.productVariationId !== null)
        .map((productVariation) => ({
            ...productVariation,
            label: `${productVariation.product?.name}`
        }))
);
// Method để tìm tên tương ứng với productVariationId
function getProductVariationName(productVariationId: ProductVariationType) {
    const matchedProductVariation = productVariationWithLabel.value.find(
        productVariation => productVariation.productVariationId === productVariationId
    );
    return matchedProductVariation ? matchedProductVariation.label : 'null';
}

/*--Refresh form & select box--*/
const handleRefresh = async () => {
    selectedProductVariation.value = null;
    selectedSize.value = null;
    currentProductVariationSize.value = {};
}

const handleUpdate = async () => {
    try {
        const selectedProductVariationValue = selectedProductVariation.value;
        const selectedSizeValue = selectedSize.value;
        // Kiểm tra xem giá trị đã được chọn hay chưa
        if (!selectedProductVariationValue || !selectedSizeValue) {
            throw new Error("ProductVariation and size must be selected.");
        }
        // Gán giá trị vào product.value
        currentProductVariationSize.value.productVariation = selectedProductVariationValue;
        currentProductVariationSize.value.size = selectedSizeValue;
        await productVariationSizeStore.updateProductVariationSize(currentProductVariationSize.value.productVariationSizeId, currentProductVariationSize.value as UpdateParams)
        await productVariationSizeStore.fetchAllProductVariationSizesAdmin();
        productVariationSizes.value = productVariationSizeStore.getproductVariationSizes.value;
    } catch (error) {
        console.error('Error updating product:', error);
    }
}
const handleSave = async () => {
    try {
        // Lấy giá trị từ các select box
        const selectedProductVariationValue = selectedProductVariation.value;
        const selectedSizeValue = selectedSize.value;

        // Kiểm tra xem giá trị đã được chọn hay chưa
        if (!selectedProductVariationValue || !selectedSizeValue) {
            throw new Error("ProductVariation and Size must be selected.");
        }

        // Gán giá trị vào product.value
        currentProductVariationSize.value.productVariation = selectedProductVariationValue;
        console.log("Variation: ", currentProductVariationSize.value.productVariation)
        currentProductVariationSize.value.size = selectedSizeValue;
        console.log("Size: ", currentProductVariationSize.value.size)
        console.log("quantity: ", currentProductVariationSize.value.quantity)
        await productVariationSizeStore.addProductVariationSize(currentProductVariationSize.value as CreationProductVariationSizeParams);
        // Xử lý phản hồi từ API ở đây (ví dụ: hiển thị thông báo thành công, cập nhật dữ liệu, vv.)
        await productVariationSizeStore.fetchAllProductVariationSizesAdmin();
        console.log('ProductVariationSize created successfully!');
    } catch (error) {
        // Xử lý lỗi khi gọi API (ví dụ: hiển thị thông báo lỗi, ghi log lỗi, vv.)
        console.error('Error creating productVariationSize:', error);
    }

    currentProductVariationSize.value = {};
    selectedProductVariation.value = null;
    selectedSize.value = null;
    dialogVisible.value = false;
};
const cancelDelete = () => {
    currentProductVariationSize.value = {};
    deleteDialogVisible.value = false;
};

const showDeleteDialog = (productVariationSize: ProductVariationSizeType) => {
    currentProductVariationSize.value = { ...productVariationSize };
    deleteDialogVisible.value = true;
};
const handleDelete = async () => {
    try {
        await productVariationSizeStore.deleteProductVariationSize(currentProductVariationSize.value.productVariationSizeId);
        await productVariationSizeStore.fetchAllProductVariationSizesAdmin();
        productVariationSizes.value = productVariationSizeStore.getproductVariationSizes.value;
    } catch (error) {
        console.error('Error deleting productVariationSizes:', error);
    }
    currentProductVariationSize.value = {};
    deleteDialogVisible.value = false;
}

const editData = (rowData: { data: ProductVariationSizeType }) => {
    selectedProductVariationSize.value = { ...rowData.data };

    // Find the selected brand based on sizeId
    selectedSize.value = sizes.value.find(
        size => size.sizeId === selectedProductVariationSize.value.size.sizeId
    );

    // Find the selected brand based on productVariationId
    selectedProductVariation.value = productVariationStore.getproductVariations.value.find(
        productVariation => productVariation.productVariationId === selectedProductVariationSize.value?.productVariation?.productVariationId
    );

    console.log(selectedProductVariation.value)

    currentProductVariationSize.value = { ...selectedProductVariationSize.value };
};

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
