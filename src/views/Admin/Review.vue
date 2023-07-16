<template>
  <div class="account-management">
    <div class="flex justify-center text-3xl font-bold mb-4">Reviews</div>

    <div class="account-management__user-accounts">
      <DataTable :value="reviews" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
        <Column field="reviewId" header="Review Id"></Column>
        <Column field="userId" header="User Id"></Column>
        <Column field="productVariationId" header="Product Variation Id"></Column>
        <Column field="content" header="Content"></Column>

        <Column field="rateStar" header="Rate Star"></Column>
        <!-- Add more columns as needed -->

        <Column header="Tools">
          <template #body="rowData">
            <div class="product-list__actions">
              <Button @click="editData(rowData)" icon="pi pi-pencil" class=" p-button-rounded p-button-success"></Button>
              <Button @click="showDeleteDialog(rowData.data)" icon="pi pi-trash"
                class="p-button-rounded p-button-danger"></Button>
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
