<template>
  <div class="category-list">
    <h1 class="category-list__title">Danh sách danh mục</h1>
      
    <div class="category-list__table">
      <!-- <Dropdown v-model="selectedCategoryId" :options="categoryOptions" placeholder="Select a Category" class="w-full md:w-14rem" /> -->
      <Dropdown id="parentCategoryId" :model-value="currentCategory.parentCategoryId" @update:model-value="currentCategory.parentCategoryId = $event" :options="categoryOptions" placeholder="Select a Category" />
      <DataTable :value="filteredCategories" :paginator="true" :rows="10" :rows-per-page-options="[5, 10, 25]">
        <Column field="categoryId" header="ID" :filter="true" :filterMatchMode="'contains'"></Column>
        <Column field="code" header="Mã" :filter="true" :filterMatchMode="'contains'"></Column>
        <Column field="name" header="Tên" :filter="true" :filterMatchMode="'contains'"></Column>
        <Column header="Thao tác">
          <template #body="rowData">
            <div class="category-list__actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success" @click="editCategory(rowData.data)"></Button>
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteCategory(rowData.data)"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <div class="category-list__add-button">
      <Button class="p-button-primary" label="Thêm danh mục" @click="addCategory"></Button>
    </div>

    <Dialog v-model="dialogVisible" :visible="dialogVisible" :header="dialogHeader" class="category-list__dialog">
      <div class="p-fluid">
        <div class="p-field">
          <label for="categoryId">ID</label>
          <InputText id="categoryId" v-model="currentCategory.categoryId" :disabled="isEditing"></InputText>
        </div>
        <div class="p-field">
          <label for="categoryCode">Mã</label>
          <InputText id="categoryCode" v-model="currentCategory.code"></InputText>
        </div>
        <div class="p-field">
          <label for="categoryName">Tên</label>
          <InputText id="categoryName" v-model="currentCategory.name"></InputText>
        </div>
        <div class="p-field">
          <label for="parentCategoryId">Danh mục cha</label>
          <Dropdown id="parentCategoryId" v-model="currentCategory.parentCategoryId" :options="categoryOptions" placeholder="Select a Category" />
        </div>
      </div>

      <template #footer>
        <div class="category-list__dialog-buttons">
          <Button class="p-button-success" label="Lưu" @click="saveCategory"></Button>
          <Button class="p-button-danger" label="Hủy" @click="cancelEdit"></Button>
        </div>
      </template>
    </Dialog>

    <Dialog v-model="deleteDialogVisible" :visible="deleteDialogVisible" header="Xác nhận xóa" :closable="false" class="category-list__dialog">
      <p>Bạn có chắc chắn muốn xóa danh mục này?</p>

      <template #footer>
        <div class="category-list__dialog-buttons">
          <Button class="p-button-danger" label="Xóa" @click="confirmDeleteCategory"></Button>
          <Button class="p-button-secondary" label="Hủy" @click="cancelDelete"></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useQuery } from "@tanstack/vue-query";
import axios from 'axios';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Category from '@/models/Category';

interface Category {
  categoryId: number;
  code: string;
  name: string;
  parentCategoryId: number;
}

const dialogHeader = ref('');

const { data: categories, refetch: fetchCategories } = useQuery<Category[]>(["categories"], () => {
  return axios.get<Category[]>('http://localhost:8080/api/v1/categories')
    .then(response => response.data);
});




const selectedCategoryId = ref<number | null>(null);

const categoryOptions = computed(() => {
  const options = [];
  if (categories.value) {
    for (const category of categories.value) {
      if (category.categoryId === 1 || category.categoryId === 2 || category.categoryId === 3) {
        options.push({ label: category.name, value: category.name, categoryId: category.categoryId });
      }
    }
  }
  return options;
});


const filteredCategories = computed(() => {
  if (!categories.value || selectedCategoryId.categoryId === null) {
    console.log(categories.value);
    console.log(selectedCategoryId.value);
    return categories.value;
  } else {
    console.log(selectedCategoryId.value);
    console.log(categories.value);
    return categories.value.filter(category => category.parentCategoryId === selectedCategoryId.value);
  }
});

// const filteredCategories = computed(() => {
//   if (!categories.value || selectedCategoryId.value === null) {
//     return []; // Trả về một mảng rỗng nếu không có dữ liệu hoặc selectedCategoryId không có giá trị
//   } else {
//     return categories.value.filter((category: Category) => category.parentCategoryId === selectedCategoryId.value);
//   }
// });


const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const currentCategory = ref<Category>({ categoryId: 0, code: '', name: '', parentCategoryId: 0 });
let isEditing = false;

function addCategory() {
  isEditing = false;
  currentCategory.value = { categoryId: 0, code: '', name: '', parentCategoryId: 0 };
  dialogVisible.value = true;
  dialogHeader.value = 'Thêm danh mục';
}

function editCategory(category: Category) {
  isEditing = true;
  currentCategory.value = { ...category };
  dialogVisible.value = true;
  dialogHeader.value = 'Sửa danh mục';
}

function saveCategory() {
  if (isEditing) {
    // Gọi API để cập nhật danh mục
    axios
      .put(`http://localhost:8080/api/v1/categories/${currentCategory.value.categoryId}`, currentCategory.value) // Thay đổi URL của API tương ứng
      .then(() => {
        // Cập nhật lại danh sách danh mục sau khi cập nhật thành công
        fetchCategories();
        cancelEdit();
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    // Gọi API để thêm danh mục mới
    axios
      .post('http://localhost:8080/api/v1/categories', currentCategory.value) // Thay đổi URL của API tương ứng
      .then(() => {
        // Cập nhật lại danh sách danh mục sau khi thêm thành công
        fetchCategories();
        cancelEdit();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function cancelEdit() {
  dialogVisible.value = false;
  currentCategory.value = { categoryId: 0, code: '', name: '', parentCategoryId: 0 };
}

function deleteCategory(category: Category) {
  currentCategory.value = { ...category };
  deleteDialogVisible.value = true;
}

function confirmDeleteCategory() {
  // Gọi API để xóa danh mục
  axios
    .delete(`http://localhost:8080/api/v1/categories/${currentCategory.value.categoryId}`) // Thay đổi URL của API tương ứng
    .then(() => {
      // Cập nhật lại danh sách danh mục sau khi xóa thành công
      fetchCategories();
      cancelDelete();
    })
    .catch((error) => {
      console.error(error);
    });
}

function cancelDelete() {
  deleteDialogVisible.value = false;
  currentCategory.value = { categoryId: 0, code: '', name: '', parentCategoryId: 0 };
}
onMounted(fetchCategories);
</script>

<style scoped>
.p-mr-2 {
  margin-right: 0.5rem;
}
.category-list {
  padding: 20px;
}

.category-list__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.category-list__table {
  margin-bottom: 20px;
}

.category-list__actions {
  display: flex;
  gap: 10px;
}

.category-list__add-button {
  text-align: right;
  margin-bottom: 20px;
}

.category-list__dialog {
  width: 400px;
}

.category-list__dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
