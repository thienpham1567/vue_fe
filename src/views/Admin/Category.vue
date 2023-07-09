<template>
  <div class="category-list">
    <h1 class="category-list__title">Danh sách danh mục</h1>
    <div class="category-list__add-button">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="searchText" placeholder="Search" @input="searchData"></InputText>
      </span>
      <Button class="p-button-primary" label="Thêm danh mục" @click="showAddDialog"></Button>
    </div>
    <div class="category-list__table">
      <DataTable :value="filteredCategories" :paginator="true" :rows="10" :rows-per-page-options="[5, 10, 25]"
        :key="tableKey">
        <Column field="categoryId" header="ID"></Column>
        <Column field="name" header="Tên"></Column>
        <Column field="parentCategory.name" header="Danh mục cha"></Column>
        <Column header="Thao tác">
          <template #body="rowData">
            <div class="category-list__actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success"
                @click="showEditDialog(rowData.data)"></Button>
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                @click="showDeleteDialog(rowData.data)"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog v-model="dialogVisible" :visible="dialogVisible" :header="isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'"
      class="category-list__dialog">
      <div class="p-fluid">
        <div class="p-field">
          <label for="categoryName">Tên</label>
          <InputText id="categoryName" v-model="currentCategory.name"></InputText>
        </div>
        <div class="p-field">
          <label for="parentCategoryId">Danh mục cha</label>
          <Dropdown id="parentCategoryId" v-model="currentCategory.parentCategory" :options="getSubCategories"
            option-label="name" option-value="categoryId" :disabled="isEditing"></Dropdown>
        </div>
      </div>

      <template #footer>
        <div class="category-list__dialog-buttons">
          <Button class="p-button-success" label="Lưu" @click="saveCategory"></Button>
          <Button class="p-button-danger" label="Hủy" @click="cancelEdit"></Button>
        </div>
      </template>
    </Dialog>

    <Dialog v-model="deleteDialogVisible" :visible="deleteDialogVisible" header="Xác nhận xóa" :closable="false"
      class="category-list__dialog">
      <p>Bạn có chắc chắn muốn xóa danh mục này?</p>

      <template #footer>
        <div class="category-list__dialog-buttons">
          <Button class="p-button-danger" label="Xóa" @click="delCategory"></Button>
          <Button class="p-button-secondary" label="Hủy" @click="cancelDelete"></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import useCategoryStore from '@/store/CategoryStore';
import { CategoryType, CreationParams, UpdateParams } from '@/types/category';

const {
  categories,
  getSubCategories,
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = useCategoryStore();
const currentCategory = ref<CategoryType>({});
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEditing = ref(false);
const tableKey = ref(0); // Key to force DataTable re-render
const searchText = ref('');
const searchKey = ref(0);

onMounted(async () => {
  try {
    await fetchCategories();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
});

const filteredCategories = computed(() => {
  const filteredCategories3 = categories.slice(3);
  const searchValue = searchText.value.trim().toLowerCase();

  if (searchValue !== '') {
    return filteredCategories3.filter(category =>
      category.name.toLowerCase().includes(searchValue)
    );
  }

  return filteredCategories3;
});


const searchData = () => {
  searchKey.value += 1;
};

const showAddDialog = () => {
  clearCurrentCategory();
  isEditing.value = false;
  dialogVisible.value = true;
};

const showEditDialog = (category: CategoryType) => {
  currentCategory.categoryId = category.categoryId;
  currentCategory.parentCategory = category.parentCategory;
  currentCategory.name = category.name;
  isEditing.value = true;
  dialogVisible.value = true;
};


const cancelEdit = () => {
  clearCurrentCategory();
  dialogVisible.value = false;
};

const saveCategory = async () => {
  if (isEditing.value) {
    try {
      await updateCategory(currentCategory.categoryId!, currentCategory as UpdateParams);
      await fetchCategories();
      cancelEdit();
    } catch (error) {
      console.error('Error updating category:', error);
      // Xử lý lỗi
    }
  } else {
    try {
      const creationParams: CreationParams = {
        name: currentCategory.name,
        parentCategoryId: currentCategory.parentCategory
      };
      await addCategory(creationParams);
      await fetchCategories();
      // tableKey.value += 1; // Force DataTable re-render
      cancelEdit();
    } catch (error) {
      console.error('Error adding category:', error);
      // Xử lý lỗi
    }
  }
};

const showDeleteDialog = (category: CategoryType) => {
  currentCategory.categoryId = category.categoryId;
  // currentCategory.parentCategoryId = category.parentCategoryId;
  currentCategory.name = category.name;
  deleteDialogVisible.value = true;
};

const cancelDelete = () => {
  clearCurrentCategory();
  deleteDialogVisible.value = false;
};

const delCategory = async () => {
  try {
    await deleteCategory(currentCategory.categoryId!);
    await fetchCategories();
    // tableKey.value += 1; // Force DataTable re-render
  } catch (error) {
    console.error('Error deleting category:', error);
    // Xử lý lỗi
  }

  clearCurrentCategory();
  deleteDialogVisible.value = false;
};

const clearCurrentCategory = () => {
  currentCategory.categoryId = undefined;
  // currentCategory.parentCategoryId = undefined;
  currentCategory.name = '';
};


</script>

<style scoped>
.p-mr-2 {
  margin-right: 0.5rem;
}

.category-list__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.category-list__table {
  margin-bottom: 2rem;
}

.category-list__actions {
  display: flex;
  align-items: center;
}

.category-list__add-button {
  text-align: right;
  margin-bottom: 1rem;
}

.category-list__dialog {
  width: 30rem;
}

.category-list__dialog-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>