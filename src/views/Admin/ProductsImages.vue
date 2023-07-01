<template>
    <div>
        <div class="flex font-bold text-4xl justify-center mb-4">Product Image</div>
        <div class=" mb-4">
            <div class="flex justify-between ml-2 mr-4">
                <div class="w-1/2 ml-2 mr-2">
                    <Dropdown v-model="selectedBrand" :options="brands" optionLabel="name" placeholder="Select a Brand"
                        class="w-full md:w-14rem" />
                </div>
                <div class="w-1/2 ml-2">
                    <Dropdown v-model="selectedCategory" :options="categoriesWithLabel" optionLabel="label"
                        placeholder="Select a Category" class="w-full md:w-14rem">
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex align-items-center">
                                <div>{{ slotProps.value.name }}</div>
                                <div class="mx-1"> - </div>
                                <div>{{
                                    slotProps.value.parentCategory.name }}</div>
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                    </Dropdown>
                </div>
            </div>
            <div class="mr-4 ml-4 mt-4">
                <label for="SKU-Code">SKU Code</label>
                <InputText v-model="currentProduct.sku" class="w-full" placeholder="93AB3S" />
            </div>
            <div class="flex">
                <div class="mr-4 ml-4 mt-4 w-1/2">
                    <label for="ProductName">Product Name</label>
                    <InputText v-model="currentProduct.name" class="w-full" placeholder="Product Name" />
                </div>
                <div class="mr-4 ml-4 mt-4 w-1/2">
                    <label for="ProductPrice">Product Price</label>
                    <InputNumber v-model="currentProduct.price" class="w-full" inputId="currency-us" placeholder="$00.00"
                        mode="currency" currency="USD" locale="en-US" />
                </div>
            </div>
            <div class="mr-4 ml-4 mt-4">
                <label for="description">Description</label>
                <Textarea v-model="currentProduct.description" class="w-full" rows="5" cols="30" />
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
        <div class=" mb-4 mt-12">
            <div class="product-list__table">
                <div class="flex justify-center">
                    <h2 class="text-3xl font-semibold">Product list</h2>
                </div>
                <DataTable :value="products" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
                    <Column field="productId" header="Product Id"></Column>
                    <Column field="brand.brandId" header="Brand Id"></Column>
                    <Column field="category.categoryId" header="Category Id"></Column>
                    <Column field="createdAt" header="Created At"></Column>
                    <Column field="updatedAt" header="Update At"></Column>

                    <Column class="" field="description" header="Description">
                        <template #body="rowData">
                            <div class="description-cell">
                                {{ rowData.data.description.length > 150 ? rowData.data.description.slice(0, 150) +
                                    '...' :
                                    rowData.data.description }}
                            </div>
                        </template>
                    </Column>

                    <Column field="name" header="Product Name"></Column>
                    <!-- ngày tháng năm chưa format -->
                    <Column field="price" header="Price">
                        <template #body="rowData">
                            ${{ rowData.data.price }}
                        </template>
                    </Column>

                    <Column field="sku" header="SKU Code"></Column>
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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
// import TabView from 'primevue/tabview';
// import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
import Dialog from 'primevue/dialog';
//import useProductStore from '@/store/ProductStore';
import { ProductType, CreationParams, UpdateAdminParams } from '@/types/product';
import { BrandType } from '@/types/brand';
import { CategoryType } from '@/types/category';
import { ColorType } from '@/types/color';
import { ProductVariationType, CreationProductVariationParams } from '@/types/productVariation';
import useBrandStore from '@/store/BrandStore';
import useCategoryStore from '@/store/CategoryStore';
import useColorStore from '@/store/ColorStore';
import useProductAdminStore from '@/store/ProductAdminStore';
import useProductVariationAdminStore from '@/store/ProductVariationAdminStore';
import { ref, onMounted, computed } from 'vue';

const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const brandStore = useBrandStore();
const brands = ref<BrandType[]>([]);
const selectedBrand = ref(null);

const categoryStore = useCategoryStore();
const categories = ref<CategoryType[]>([]);
const selectedCategory = ref(null);

const productStore = useProductAdminStore();
const products = ref<ProductType[]>([]);
const currentProduct = ref<ProductType>({});
const selectedProduct = ref<ProductType | null>(null);


// const price = ref<number | null>(null);


const categoriesWithLabel = computed(() =>
    categories.value.map((category) => ({
        ...category,
        label: `${category.name} - ${category.parentCategory?.name}`
    }))
);

/*--ProductVariation: select color--*/
// const colorStore = useColorStore();
// const colors = ref<ColorType[]>([]);
// const selectedColor = ref(null);

// const productVariationStore = useProductVariationAdminStore();
// const productVariations = ref<ProductVariationType[]>([]);
// const currentProductVariation = ref<ProductVariationType>({});

// const handleSaveProductVariation = async () => {
//     try {
//         // Lấy giá trị từ các select box
//         const selectedColorValue = selectedColor.value;
//         const selectedProductValue = selectedProduct.value;

//         // Kiểm tra xem giá trị đã được chọn hay chưa
//         if (!selectedColorValue || !selectedProductValue) {
//             throw new Error("Brand and category must be selected.");
//         }

//         // Gán giá trị vào product.value
//         currentProductVariation.value.color = selectedColorValue;
//         currentProductVariation.value.product = selectedProductValue;
//         console.log(currentProductVariation.value.color);
//         console.log(currentProductVariation.value.product);
//         await productVariationStore.addProductVariation(currentProductVariation.value as CreationProductVariationParams);
//         // Xử lý phản hồi từ API ở đây (ví dụ: hiển thị thông báo thành công, cập nhật dữ liệu, vv.)
//         await productVariationStore.fetchAllProductVariationsAdmin();
//         console.log('ProductVariation created successfully!');
//     } catch (error) {
//         // Xử lý lỗi khi gọi API (ví dụ: hiển thị thông báo lỗi, ghi log lỗi, vv.)
//         console.error('Error creating ProductVariation:', error);
//     }

//     currentProduct.value = {};
//     selectedBrand.value = null;
//     selectedCategory.value = null;
//     dialogVisible.value = false;
// };


onMounted(async () => {
    /*--ProductVariation--*/
    // try {
    //     await productVariationStore.fetchAllProductVariationsAdmin();
    //     productVariations.value = productVariationStore.getproductVariations.value;
    // } catch (error) {
    //     console.log("Error fetching productVariation", error);
    // }
    // /*--ProductVariation color--*/
    // try {
    //     await colorStore.fetchAllColor();
    //     colors.value = colorStore.getColors.value;
    //     console.log(colors);
    // } catch (error) {
    //     console.log("Error fetching color", error);
    // }
    /*--Product--*/
    try {
        await productStore.fetchAllProductsAdmin();
        products.value = productStore.getProducts.value;
        console.log(products);
    } catch (error) {
        console.error('Error fetching products', error);
    }
    try {
        await brandStore.fetchBrands();
        //brands.value = brandStore.getBrands.value.map(brands => brands.brandId + ' - ' + brands.name);
        brands.value = brandStore.getBrands.value;
    } catch (error) {
        console.error('Error fetching brands', error);
    }
    try {
        await categoryStore.fetchCategories();
        //categories.value = categoryStore.getMainSubCategories.value.map(categories => categories.categoryId + ' - ' + categories.name + ' - ' + categories.parentCategory?.name);
        categories.value = categoryStore.getMainSubCategories.value;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }

});


const handleUpdate = async () => {
    try {
        const selectedBrandValue = selectedBrand.value;
        const selectedCategoryValue = selectedCategory.value;
        // Kiểm tra xem giá trị đã được chọn hay chưa
        if (!selectedBrandValue || !selectedCategoryValue) {
            throw new Error("Brand and category must be selected.");
        }
        // Gán giá trị vào product.value
        currentProduct.value.brand = selectedBrandValue;
        currentProduct.value.category = selectedCategoryValue;
        await productStore.updateProduct(currentProduct.value.productId, currentProduct.value as UpdateAdminParams);
        await productStore.fetchAllProductsAdmin();
        products.value = productStore.getProducts.value;
    } catch (error) {
        console.error('Error updating product:', error);
    }
}
const handleSave = async () => {
    try {
        // Lấy giá trị từ các select box
        const selectedBrandValue = selectedBrand.value;
        const selectedCategoryValue = selectedCategory.value;

        // Kiểm tra xem giá trị đã được chọn hay chưa
        if (!selectedBrandValue || !selectedCategoryValue) {
            throw new Error("Brand and category must be selected.");
        }

        // Gán giá trị vào product.value
        currentProduct.value.brand = selectedBrandValue;
        currentProduct.value.category = selectedCategoryValue;
        await productStore.addProduct(currentProduct.value as CreationParams);
        console.log(currentProduct.value)
        // Xử lý phản hồi từ API ở đây (ví dụ: hiển thị thông báo thành công, cập nhật dữ liệu, vv.)
        await productStore.fetchAllProductsAdmin();
        console.log('Product created successfully!');
    } catch (error) {
        // Xử lý lỗi khi gọi API (ví dụ: hiển thị thông báo lỗi, ghi log lỗi, vv.)
        console.error('Error creating product:', error);
    }

    currentProduct.value = {};
    selectedBrand.value = null;
    selectedCategory.value = null;
    dialogVisible.value = false;
};
const cancelDelete = () => {
    currentProduct.value = {};
    deleteDialogVisible.value = false;
};

const showDeleteDialog = (product: ProductType) => {
    currentProduct.value = { ...product };
    deleteDialogVisible.value = true;
};
const handleDelete = async () => {
    try {
        await productStore.deleteProduct(currentProduct.value.productId);
        await productStore.fetchAllProductsAdmin();
        products.value = productStore.getProducts.value;
    } catch (error) {
        console.error('Error deleting product:', error);
    }
    currentProduct.value = {};
    deleteDialogVisible.value = false;
}

const editData = (rowData: { data: ProductType }) => {
    selectedProduct.value = { ...rowData.data };

    // Find the selected brand based on brandId
    selectedBrand.value = brands.value.find(
        brand => brand.brandId === selectedProduct.value.brand.brandId
    );

    // Find the selected category based on categoryId
    selectedCategory.value = categories.value.find(
        category => category.categoryId === selectedProduct.value.category.categoryId
    );

    currentProduct.value = { ...selectedProduct.value };
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
