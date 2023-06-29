<template>
    <TabView>
        <TabPanel header="Products">
            <div class=" mb-4">
                <div class="flex justify-between ml-2 mr-4">
                    <div class="w-1/2 ml-2 mr-2">
                        <Dropdown v-model="selectedBrand" :options="brands" optionLabel="name" placeholder="Select a Brand"
                            class="w-full md:w-14rem" />
                    </div>
                    <div class="w-1/2 ml-2">
                        <Dropdown v-model="selectedCategory" :options="categoriesWithLabel" optionLabel="label"
                            placeholder="Select a Category" class="w-full md:w-14rem" />
                    </div>
                </div>
                <div class="mr-4 ml-4 mt-4">
                    <label for="SKU-Code">SKU Code</label>
                    <InputText v-model="product.sku" class="w-full" placeholder="93AB3S" />
                </div>
                <div class="flex">
                    <div class="mr-4 ml-4 mt-4 w-1/2">
                        <label for="ProductName">Product Name</label>
                        <InputText v-model="product.name" class="w-full" placeholder="Product Name" />
                    </div>
                    <div class="mr-4 ml-4 mt-4 w-1/2">
                        <label for="ProductPrice">Product Price</label>
                        <InputNumber v-model="product.price" class="w-full" inputId="currency-us" placeholder="$00.00"
                            mode="currency" currency="USD" locale="en-US" />
                    </div>
                </div>
                <div class="mr-4 ml-4 mt-4">
                    <label for="description">Description</label>
                    <Textarea v-model="product.description" class="w-full" rows="5" cols="30" />
                </div>
                <div class="flex ml-4 mr-4">
                    <div class="mt-4">
                        <Button @click="handleSave" type="submit" label="Save"
                            class="w-full text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
                    </div>
                    <div class="ml-2 mt-4">
                        <Button type="submit" label="Update"
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
                <div class="account-management__user-accounts">
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
                                <div class="brand-list__actions">
                                    <Button @click="editData" icon="pi pi-pencil"
                                        class=" p-button-rounded p-button-success"></Button>
                                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"></Button>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </TabPanel>
        <TabPanel header="Products Variations">
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </TabPanel>
        <TabPanel header="Products Variations Sizes">
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
                expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
            </p>
        </TabPanel>
        <TabPanel header="Products Images">
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
                expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                minus.
            </p>
        </TabPanel>
    </TabView>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Dropdown from 'primevue/dropdown';
//import useProductStore from '@/store/ProductStore';
import { ProductType, CreationParams } from '@/types/product';
import { BrandType } from '@/types/brand';
import useBrandStore from '@/store/BrandStore';
import { CategoryType } from '@/types/category';
import useCategoryStore from '@/store/CategoryStore';
import useProductAdminStore from '@/store/ProductAdminStore';
import { ref, onMounted, computed } from 'vue';
const brandStore = useBrandStore();
const brands = ref<BrandType[]>([]);
const selectedBrand = ref(null);

const categoryStore = useCategoryStore();
const categories = ref<CategoryType[]>([]);
const selectedCategory = ref(null);

const productStore = useProductAdminStore();
const products = ref<ProductType[]>([]);
const product = ref<ProductType>({});

const price = ref<number | null>(null);
const tableKey = ref(0); // Key to force DataTable re-render

const categoriesWithLabel = computed(() =>
    categories.value.map((category) => ({
        ...category,
        label: `${category.name} - ${category.parentCategory?.name}`
    }))
);

onMounted(async () => {
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
        product.value.brand = selectedBrandValue;
        product.value.category = selectedCategoryValue;
        await productStore.addProduct(product.value as CreationParams);
        console.log(product.value)
        // Xử lý phản hồi từ API ở đây (ví dụ: hiển thị thông báo thành công, cập nhật dữ liệu, vv.)
        await productStore.fetchAllProductsAdmin();
        tableKey.value += 1; // Force DataTable re-render
        console.log('Product created successfully!');
    } catch (error) {
        // Xử lý lỗi khi gọi API (ví dụ: hiển thị thông báo lỗi, ghi log lỗi, vv.)
        console.error('Error creating product:', error);
    }
};

// const handleSave = async () => {
//     try {
//         await productStore.addProduct(product.value as CreationParams);
//         // Xử lý phản hồi từ API ở đây (ví dụ: hiển thị thông báo thành công, cập nhật dữ liệu, vv.)
//         await productStore.fetchAllProductsAdmin();
//         tableKey.value += 1; // Force DataTable re-render
//         console.log('Product created successfully!');
//     } catch (error) {
//         // Xử lý lỗi khi gọi API (ví dụ: hiển thị thông báo lỗi, ghi log lỗi, vv.)
//         console.error('Error creating product:', error);
//     }
// };

// const handleSave = async () => {
//     try {
//         await addProduct(product.value as CreationParams);
//         // Xử lý phản hồi từ API ở đây (ví dụ: hiển thị thông báo thành công, cập nhật dữ liệu, vv.)
//         await fetchAllProductsAdmin();
//         tableKey.value += 1; // Force DataTable re-render
//         console.log('Product created successfully!');
//     } catch (error) {
//         // Xử lý lỗi khi gọi API (ví dụ: hiển thị thông báo lỗi, ghi log lỗi, vv.)
//         console.error('Error creating product:', error);
//     }
// };
// watch(selectedCategory, (newCategory) => {
//     selectedCategory
//     console.log('Selected Category:', Number(newCategory.slice(0, 2)));
// });

// watch(selectedBrand, (newBrand) => {
//     // Update the selected category value here

//     //console.log(typeof (newCategory));
//     console.log('Selected Brand:', Number(newBrand.slice(0, 2)));
// });




// onMounted(async () => {
//     try {
//         await categoryStore.fetchCategories();
//         categories.value = categoryStore.getCategories.value.map(categories => categories.name);
//     } catch (error) {
//         console.error('Error fetching categories', error);
//     }
// });
</script>

<style>
.description-cell {
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
