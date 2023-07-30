<template>
  <DataTable :value="ReportByProductQuantitys" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 15]">
    <Column field="name" header="Product Name"></Column>
    <Column field="quantity" header="Quantity"></Column>
    <Column field="color" header="Color"></Column>
    <Column field="size" header="Size"></Column>
  </DataTable>
</template>
  
<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, computed, onMounted } from 'vue';
import { reportProductQuantityType } from '@/types/reportProductQuantity';
import useReportByProductQuantiy from '@/store/ReportByProductQuantity';

const ReportByProductQuantityStore = useReportByProductQuantiy();
const ReportByProductQuantitys = ref<reportProductQuantityType[]>([]);

/*--Report: best selling by brands--*/
onMounted(async () => {
  /*--Load Report By Brand--*/
  try {
    await ReportByProductQuantityStore.fetchReportProductQuantity();
    ReportByProductQuantitys.value = ReportByProductQuantityStore.getByProductQuantitys.value;
  } catch (error) {
    console.log('Error fetching ReportByBrands', error);
  }
});

</script>
  
<style scoped>
.admin-report__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.admin-report__filters {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.admin-report__filters label {
  margin-right: 10px;
}

.admin-report__summary {
  display: flex;
  margin-bottom: 20px;
}

.admin-report__summary-item {
  flex: 1;
  text-align: center;
}

.admin-report__summary-label {
  font-weight: bold;
}

.admin-report__summary-value {
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
}

.admin-report__table {
  margin-bottom: 20px;
}

.admin-report__empty {
  text-align: center;
  font-style: italic;
  color: #999;
}

.admin-report__buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.chart-top {
  width: 34rem;
  height: 17rem;
}
</style>
  