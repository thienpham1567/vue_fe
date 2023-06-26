<template>
  <div class="account-management">
    <h1 class="account-management__title">Quản lý đánh giá</h1>

    <div class="account-management__user-accounts">
      <h2 class="account-management__section-title">Danh sách các đánh giá</h2>
      <DataTable :value="reviews" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
        <Column field="reviewId" header="Review Id"></Column>
        <Column field="userId" header="User Id"></Column>
        <Column field="productVariationId" header="Product Variation Id"></Column>
        <Column field="content" header="Content"></Column>

        <!-- ngày tháng năm chưa format -->
        <Column field="createdAt" header="Created At"></Column>

        <Column field="rateStar" header="Rate Star"></Column>
        <!-- Add more columns as needed -->

        <Column header="Kiểm duyệt">
          <template #body="rowData">
            <div class="brand-list__actions">
              <Button icon="pi pi-pencil" class=" p-button-rounded p-button-success">Chỉnh sửa</Button>
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import useReviewStore from '@/store/ReviewStore';
import { ReviewType } from '@/types/review';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

const reviewStore = useReviewStore();
const reviews = ref<ReviewType[]>([]);

onMounted(async () => {
  try {
    await reviewStore.fetchReviews();
    reviews.value = reviewStore.getReviews.value;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    // Handle error
  }
});
</script>

<style scoped></style>
