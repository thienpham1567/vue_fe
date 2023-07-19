<template>
  <div class="account-management">
    <div class="flex justify-center text-3xl font-bold mb-4">Reviews</div>

    <div class="account-management__user-accounts">
      <DataTable :value="reviews" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
        <Column field="reviewId" header="Review Id"></Column>
        <Column field="user.emailAddress" header="User email"></Column>
        <Column field="productVariationId" header="Product Variation Id"></Column>
        <Column field="content" header="Content"></Column>

        <Column field="rateStar" header="Rate Star"></Column>
        <!-- Add more columns as needed -->

        <Column header="Tools">
          <template #body="rowData">
            <div class="product-list__actions">
              <Button @click="showDeleteDialog(rowData.data)" icon="pi pi-trash"
                class="p-button-rounded p-button-danger"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog v-model="deleteDialogVisible" :visible="deleteDialogVisible" :closable="false">
      <div class="flex justify-center text-2xl font-bold mt-4 mb-2 ">Xác nhận xóa</div>
      <div class="text-2xl">Bạn có chắc chắn muốn xóa sản phẩm này?</div>

      <template #footer>
        <div class="product-list__dialog-buttons">
          <Button class="p-button-danger" label="Xóa" @click="handleDelete"></Button>
          <Button class="p-button-secondary" label="Hủy" @click="cancelDelete"></Button>
        </div>
      </template>
    </Dialog>
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
import Dialog from 'primevue/dialog';
const dialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const reviewStore = useReviewStore();
const reviews = ref<ReviewType[]>([]);
const currentReview = ref<ReviewType>({});

/*--Cancel layout modal delete confirm--*/
const cancelDelete = () => {
  currentReview.value = {};
  deleteDialogVisible.value = false;
};

/*--Show modal confirm--*/
const showDeleteDialog = (review: ReviewType) => {
  currentReview.value = { ...review };
  deleteDialogVisible.value = true;
};

/*--Delete review in admin page--*/
const handleDelete = async () => {
  try {
    await reviewStore.deleteReview(currentReview.value.reviewId);
    await reviewStore.fetchReviews();
    reviews.value = reviewStore.getAllReviews.value;
  } catch (error) {
    console.error('Error deleting product:', error);
  }
  currentReview.value = {};
  deleteDialogVisible.value = false;
}

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
