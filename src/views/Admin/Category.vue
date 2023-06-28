<template>
  <div class="category-list">
    <h1 class="category-list__title">Danh sách danh mục</h1>

    <div class="category-list__table">
      <DataTable :value="categories" :paginator="true" :rows="10" :rows-per-page-options="[5, 10, 25]" :key="tableKey">
        <Column field="categoryId" header="ID"></Column>
        <Column field="name" header="Tên"></Column>
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

    <div class="category-list__add-button">
      <Button class="p-button-primary" label="Thêm danh mục" @click="showAddDialog"></Button>
    </div>

    <Dialog v-model="dialogVisible" :visible="dialogVisible" :header="dialogHeader" class="category-list__dialog">
      <div class="p-fluid">
        <div class="p-field">
          <label for="categoryId">ID</label>
          <InputText id="categoryId" v-model="currentCategory.categoryId" :disabled="isEditing"></InputText>
        </div>
        <div class="p-field">
          <label for="categoryName">Tên</label>
          <InputText id="categoryName" v-model="currentCategory.name"></InputText>
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
          <Button class="p-button-danger" label="Xóa" @click="deleteCategory"></Button>
          <Button class="p-button-secondary" label="Hủy" @click="cancelDelete"></Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import useCategoryStore from '@/store/CategoryStore';
import { CategoryType, CreationParams, UpdateParams } from '@/types/category';

const categoryStore = useCategoryStore();
const categories = ref<CategoryType[]>([]);
const currentCategory = ref<CategoryType>({});
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEditing = ref(false);
const tableKey = ref(0); // Key to force DataTable re-render

onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
    categories.value = categoryStore.getCategories.value;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Xử lý lỗi
  }
});

watch([categoryStore.getCategories], () => {
  categories.value = categoryStore.getCategories.value;
});

const showAddDialog = () => {
  currentCategory.value = {};
  isEditing.value = false;
  dialogVisible.value = true;
};

const showEditDialog = (category: CategoryType) => {
  currentCategory.value = { ...category };
  isEditing.value = true;
  dialogVisible.value = true;
};

const cancelEdit = () => {
  currentCategory.value = {};
  dialogVisible.value = false;
};

const saveCategory = async () => {
  if (isEditing.value) {
    // Thực hiện cập nhật danh mục
    try {
      await categoryStore.updateCategory(currentCategory.value.categoryId, currentCategory.value as UpdateParams);
      await categoryStore.fetchCategories();
      tableKey.value += 1; // Force DataTable re-render
    } catch (error) {
      console.error('Error updating category:', error);
      // Xử lý lỗi
    }
  } else {
    // Thực hiện thêm danh mục mới
    try {
      await categoryStore.addCategory(currentCategory.value as CreationParams);
      await categoryStore.fetchCategories();
      tableKey.value += 1; // Force DataTable re-render
    } catch (error) {
      console.error('Error adding category:', error);
      // Xử lý lỗi
    }
  }

  currentCategory.value = {};
  dialogVisible.value = false;
};

const showDeleteDialog = (category: CategoryType) => {
  currentCategory.value = { ...category };
  deleteDialogVisible.value = true;
};

const cancelDelete = () => {
  currentCategory.value = {};
  deleteDialogVisible.value = false;
};

const deleteCategory = async () => {
  try {
    await categoryStore.deleteCategory(currentCategory.value.categoryId);
    await categoryStore.fetchCategories();
    tableKey.value += 1; // Force DataTable re-render
  } catch (error) {
    console.error('Error deleting category:', error);
    // Xử lý lỗi
  }

  currentCategory.value = {};
  deleteDialogVisible.value = false;
};
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
