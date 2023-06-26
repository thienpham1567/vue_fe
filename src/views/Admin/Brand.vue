<template>
  <div class="brand-list">
    <h1 class="brand-list__title">Danh sách thương hiệu</h1>
    
    <div class="brand-list__table">
      <Dropdown v-model="selectedBrand" :options="brandNames" placeholder="Select a Brand" class="w-full md:w-14rem" />

      <DataTable :value="brands" :paginator="true" :rows="10" :rows-per-page-options="[5, 10, 25]">
        <Column field="brandId" header="ID"></Column>
        <Column field="name" header="Tên">
        </Column>
        <Column header="Thao tác">
          <template #body="rowData">
            <div class="brand-list__actions">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success" @click="editBrand(rowData.data)"></Button>
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteBrand(rowData.data)"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <div class="brand-list__add-button">
      <Button class="p-button-primary" label="Thêm thương hiệu" @click="addBrand"></Button>
    </div>

    <Dialog v-model="dialogVisible" :visible="dialogVisible" :header="dialogHeader" class="brand-list__dialog">
      <div class="p-fluid">
        <div class="p-field">
          <label for="brandId">ID</label>
          <InputText id="brandId" v-model="currentBrand.brandId" :disabled="isEditing"></InputText>
        </div>
        <div class="p-field">
          <label for="brandName">Tên</label>
          <InputText id="brandName" v-model="currentBrand.name"></InputText>
        </div>
      </div>

      <template #footer>
        <div class="brand-list__dialog-buttons">
          <Button class="p-button-success" label="Lưu" @click="saveBrand"></Button>
          <Button class="p-button-danger" label="Hủy" @click="cancelEdit"></Button>
        </div>
      </template>
    </Dialog>

    <Dialog v-model="deleteDialogVisible" :visible="deleteDialogVisible" header="Xác nhận xóa" :closable="false" class="brand-list__dialog">
      <p>Bạn có chắc chắn muốn xóa thương hiệu này?</p>

      <template #footer>
        <div class="brand-list__dialog-buttons">
          <Button class="p-button-danger" label="Xóa" @click="confirmDeleteBrand"></Button>
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

interface Brand {
  brandId: number;
  name: string;
}

const dialogHeader = ref('');

const { data: brands, refetch: fetchBrands } = useQuery<Brand[]>(["brands"], () => {
  return axios.get<Brand[]>('http://localhost:8080/api/v1/brands')
    .then(response => response.data);
});

const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const currentBrand = ref<Brand>({ brandId: 0, name: '' });
let isEditing = false;

// const brandNames = computed(() => {
//   return brands.value.map(brand => brand.name);
// });


function addBrand() {
  isEditing = false;
  currentBrand.value = { brandId: 0, name: '' };
  dialogVisible.value = true;
  dialogHeader.value = 'Thêm thương hiệu';
}

function editBrand(brand: Brand) {
  isEditing = true;
  currentBrand.value = { ...brand };
  dialogVisible.value = true;
  dialogHeader.value = 'Sửa thương hiệu';
}

function saveBrand() {
  if (isEditing) {
    // Gọi API để cập nhật thương hiệu
    axios
      .put(`http://localhost:8080/api/v1/brands/${currentBrand.value.brandId}`, currentBrand.value) // Thay đổi URL của API tương ứng
      .then(() => {
        // Cập nhật lại danh sách thương hiệu sau khi cập nhật thành công
        fetchBrands();
        cancelEdit();
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    // Gọi API để thêm thương hiệu mới
    axios
      .post('http://localhost:8080/api/v1/brands', currentBrand.value) // Thay đổi URL của API tương ứng
      .then(() => {
        // Cập nhật lại danh sách thương hiệu sau khi thêm thành công
        fetchBrands();
        cancelEdit();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

function cancelEdit() {
  dialogVisible.value = false;
  currentBrand.value = { brandId: 0, name: '' };
}

function deleteBrand(brand: Brand) {
  currentBrand.value = { ...brand };
  deleteDialogVisible.value = true;
}

function confirmDeleteBrand() {
  // Gọi API để xóa thương hiệu
  axios
    .delete(`http://localhost:8080/api/v1/brands/${currentBrand.value.brandId}`) // Thay đổi URL của API tương ứng
    .then(() => {
      // Cập nhật lại danh sách thương hiệu sau khi xóa thành công
      fetchBrands();
      cancelDelete();
    })
    .catch((error) => {
      console.error(error);
    });
}

function cancelDelete() {
  deleteDialogVisible.value = false;
  currentBrand.value = { brandId: 0, name: '' };
}
</script>

<style scoped>
.p-mr-2 {
  margin-right: 0.5rem;
}
.brand-list {
  padding: 20px;
}

.brand-list__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.brand-list__table {
  margin-bottom: 20px;
}

.brand-list__actions {
  display: flex;
  gap: 10px;
}

.brand-list__add-button {
  text-align: right;
  margin-bottom: 20px;
}

.brand-list__dialog {
  width: 400px;
}

.brand-list__dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>