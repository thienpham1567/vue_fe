<template>
  <div class="admin-report flex justify-center ">
    <div>
      <div class="admin-report__title">Nhãn hiệu bán chạy</div>
    </div>
  </div>
  <div class="admin-report flex justify-center ">
    <div class="card flex justify-content-center w-1/2 h-1/2 ">
      <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Chart from 'primevue/chart';

/*--Report: best selling by brands--*/
onMounted(() => {
  chartData.value = setChartData();
});

const chartData = ref();
const chartOptions = ref({
  cutout: '60%'
});

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ['Nike', 'Adidas', 'Puma', 'New Balance'],
    datasets: [
      {
        data: [540, 325, 702, 300],
        backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--pink-500')],
        hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--pink-400')]
      }
    ]
  };
};

</script>
  
<style scoped>
.admin-report {
  padding: 20px;
}

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
</style>
  