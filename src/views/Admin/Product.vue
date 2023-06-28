<template>
    <TabView>
        <TabPanel header="Products">
            <div class=" mb-4">
                <div class="flex justify-between ml-2 mr-4">
                    <select id="sort-by" class="border rounded p-3 w-1/2 ml-2">
                        <option value="BrandId">Brand Id</option>
                    </select>
                    <select id="sort-by" class="border rounded p-3 w-1/2 ml-2">
                        <option value="CategoryId">Category Id</option>
                    </select>
                </div>
                <div class="mr-4 ml-4 mt-4">
                    <label for="SKU-Code">SKU Code</label>
                    <InputText class="w-full" placeholder="93AB3S" />
                </div>
                <div class="flex">
                    <div class="mr-4 ml-4 mt-4 w-1/2">
                        <label for="ProductName">Product Name</label>
                        <InputText class="w-full" placeholder="Product Name" />
                    </div>
                    <div class="mr-4 ml-4 mt-4 w-1/2">
                        <label for="ProductPrice">Product Price</label>
                        <InputNumber class="w-full" inputId="currency-us" placeholder="$00.00" mode="currency"
                            currency="USD" locale="en-US" />
                    </div>
                </div>
                <div class="mr-4 ml-4 mt-4">
                    <label for="lastname">Description</label>
                    <Textarea class="w-full" rows="5" cols="30" />
                </div>
                <div class="flex ml-4 mr-4">
                    <div class="mt-4">
                        <Button type="submit" label="Save"
                            class="w-full text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
                    </div>
                    <div class="ml-2 mt-4">
                        <Button type="submit" label="Update"
                            class="w-full text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500" />
                    </div>
                    <div class="ml-2 mt-4">
                        <Button type="submit" label="Delete"
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
                        <h2 class="text-3xl font-semibold">Danh sách các đánh giá</h2>
                    </div>
                    <DataTable :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
                        <Column field="reviewId" header="Product Id"></Column>
                        <Column field="reviewId" header="Brand Id"></Column>
                        <Column field="reviewId" header="Category Id"></Column>
                        <Column field="userId" header="Created At"></Column>
                        <Column field="userId" header="Update At"></Column>
                        <Column field="productVariationId" header="Description"></Column>
                        <Column field="content" header="Product Name"></Column>
                        <!-- ngày tháng năm chưa format -->
                        <Column field="createdAt" header="Price"></Column>

                        <Column field="rateStar" header="SKU Code"></Column>
                        <!-- Add more columns as needed -->
                        <Column header="Tools">
                            <template #body="rowData">
                                <div class="brand-list__actions">
                                    <Button icon="pi pi-pencil" class=" p-button-rounded p-button-success">Chỉnh
                                        sửa</Button>
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
</script>