<template>
  <div class="category-list">
    <h1 class="category-list__title">Danh sách danh mục</h1>
    <div class="category-list__add-button">
      <span class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="searchText" placeholder="Search" @input="searchData" />
      </span>
      <Button class="p-button-primary" label="Thêm danh mục" @click="showAddDialog"></Button>
    </div>
    <div class="category-list__table">
      <DataTable :value="categories" :paginator="true" :rows="10" :rows-per-page-options="[5, 10, 25]"
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
          <Dropdown id="parentCategoryId" v-model="currentCategory.parentCategoryId" :options="categoriess"
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
          <Button class="p-button-danger" label="Xóa" @click="deleteCategory"></Button>
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

const categoryStore = useCategoryStore();
const categories = ref<CategoryType[]>([]);
const categoriess = ref<CategoryType[]>([]);
const currentCategory = reactive<CategoryType>({});
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const isEditing = ref(false);
const tableKey = ref(0); // Key to force DataTable re-render
const parentCategoryOptions = ref<CategoryType[]>([]);
const searchText = ref('');
const searchKey = ref(0);

onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
    categoriess.value = categoryStore.getSubCategories.value;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Xử lý lỗi
  }
});

onMounted(async () => {
  try {
    await categoryStore.fetchCategories();
    categories.value = categoryStore.getMainSubCategories.value;
    watch(searchText, (newValue) => {
      if (newValue.trim() === '') {
        filteredCategories.value = categoryStore.getMainSubCategories.value;
      } else {
        searchData();
      }
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
});


watch(categoryStore.getCategories, () => {
  categories.value = categoryStore.getCategories.value;
});

watch(categories, () => {
  parentCategoryOptions.value = categories.value.filter(category => !category.parentCategoryId);
});
const filteredCategories = categories;



const showAddDialog = () => {
  clearCurrentCategory();
  isEditing.value = false;
  dialogVisible.value = true;
};

const showEditDialog = (category: CategoryType) => {
  currentCategory.categoryId = category.categoryId;
  currentCategory.parentCategoryId = category.parentCategoryId;
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
      await categoryStore.updateCategory(currentCategory.categoryId!, currentCategory as UpdateParams);
      await categoryStore.fetchCategories();
      tableKey.value += 1; // Force DataTable re-render
    } catch (error) {
      console.error('Error updating category:', error);
      // Xử lý lỗi
    }
  } else {
    try {
      const creationParams: CreationParams = {
        name: currentCategory.name,
        parentCategoryId: currentCategory.parentCategoryId
      };
      await categoryStore.addCategory(creationParams);
      await categoryStore.fetchCategories();
      categories.value = categoryStore.getMainSubCategories.value;
      tableKey.value += 1; // Force DataTable re-render
    } catch (error) {
      console.error('Error adding category:', error);
      // Xử lý lỗi
    }
  }

  clearCurrentCategory();
  dialogVisible.value = false;
};

const showDeleteDialog = (category: CategoryType) => {
  currentCategory.categoryId = category.categoryId;
  currentCategory.parentCategoryId = category.parentCategoryId;
  currentCategory.name = category.name;
  deleteDialogVisible.value = true;
};

const cancelDelete = () => {
  clearCurrentCategory();
  deleteDialogVisible.value = false;
};

const deleteCategory = async () => {
  try {
    await categoryStore.deleteCategory(currentCategory.categoryId!);
    await categoryStore.fetchCategories();
    categories.value = categoryStore.getMainSubCategories.value;
    tableKey.value += 1; // Force DataTable re-render
  } catch (error) {
    console.error('Error deleting category:', error);
    // Xử lý lỗi
  }

  clearCurrentCategory();
  deleteDialogVisible.value = false;
};

const clearCurrentCategory = () => {
  currentCategory.categoryId = undefined;
  currentCategory.parentCategoryId = undefined;
  currentCategory.name = '';
};
const searchData = () => {

  if (searchText.value.trim() !== '') {
    filteredCategories.value = categories.value.filter(category => {
      const name = category.name.toLowerCase();
      return name.includes(searchText.value.toLowerCase());
    });
  } else {
    filteredCategories.value = categories.value;
  }
};



</script>

<style scoped>
.p-mr-2 {
  margin-right: 0.5rem;
}

.category-list__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
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
