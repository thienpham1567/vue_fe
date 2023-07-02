<template>
  <div class="order-list">
    <h1 class="order-list__title">Danh sách đơn hàng</h1>
    <div class="order-list__filters">
      <InputText v-model="filterKeyword" placeholder="Tìm kiếm theo tên khách hàng" />
      <Dropdown v-model="filterStatus" :options="statusOptions" optionLabel="label" optionValue="value"
        placeholder="Chọn trạng thái" />
      <Button label="Áp dụng" icon="pi pi-search" @click="applyFilters" />
      <Button label="Xóa bộ lọc" icon="pi pi-times" @click="resetFilters" />
    </div>

    <DataTable :value="filteredOrders" :paginator="true" :rows="10" :rows-per-page-options="[5, 10, 25]"
      :sort-mode="'multiple'">
      <Column field="orderId" header="ID đơn hàng" sortable="custom" :sort-function="customSort"></Column>
      <Column field="user.firstName" header="Họ" sortable="custom" :sort-function="customSort"></Column>
      <Column field="user.lastName" header="Tên" sortable="custom" :sort-function="customSort"></Column>
      <Column field="orderTotalPrice" header="Tổng số tiền" sortable="custom" :sort-function="customSort"></Column>
      <Column field="ordersStatus" header="Trạng thái" :body="statusBodyTemplate" sortable="custom" :sort-function="customSort">
      </Column>
      <Column header="Xem đơn hàng" :body="viewOrderTemplate"></Column>
    </DataTable>

    <Dialog v-model="dialogVisible" :header="dialogHeader" class="order-list__dialog">
      <div class="p-fluid">
        <div class="p-field">
          <label for="orderId">ID đơn hàng</label>
          <InputText id="orderId" v-model="currentOrder.orderId" :disabled="isEditing"></InputText>
        </div>
        <div class="p-field">
          <label for="customerName">Tên khách hàng</label>
          <InputText id="customerName" v-model="currentOrder.user.username"></InputText>
        </div>
        <div class="p-field">
          <label for="customerAddress">Địa chỉ khách hàng</label>
          <InputText id="customerAddress" v-model="currentOrder.denormalizedAddress"></InputText>
        </div>
        <div class="p-field">
          <label for="customerPhone">Số điện thoại</label>
          <InputText id="customerPhone" v-model="currentOrder.user.phone"></InputText>
        </div>
        <div class="p-field">
          <label for="orderDate">Ngày đặt hàng</label>
          <Calendar id="orderDate" v-model="currentOrder.createdAt"></Calendar>
        </div>
        <div class="p-field">
          <label for="products">Danh sách sản phẩm</label>
          <DataTable :value="currentOrder.orderLines">
            <Column field="productVariationSize.productName" header="Tên sản phẩm"></Column>
            <Column field="price" header="Giá"></Column>
          </DataTable>
        </div>
      </div>

      <template #footer>
        <div class="order-list__dialog-buttons">
          <Button class="p-button p-button-success" label="Lưu" @click="saveOrder"></Button>
          <Button class="p-button p-button-secondary" label="Hủy" @click="cancelEdit"></Button>
        </div>
      </template>
    </Dialog>

    <Button class="p-button p-button-primary" label="Thêm đơn hàng" @click="addOrder"></Button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import useOrderStore from '@/store/OrderStore';
import { OrderType } from '@/types/order';
const orders = ref<OrderType[]>([]);
const orderStore = useOrderStore();
const dialogHeader = ref('');

onMounted(async () => {
  try {
    await orderStore.fetchOrders();
    orders.value = orderStore.getOrders.value;
    console.log(orders.value);
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Handle error
  }
});

// Trong phần setup script

// const orders = ref<OrderType[]>([
//   {
//     orderId: 1,
//     user: { username: "John Doe", phone: "123456789" },
//     orderTotalPrice: 100,
//     ordersStatus: "pending",
//     denormalizedAddress: "123 Main St",
//     createdAt: new Date("2023-06-01"),
//     orderLines: [
//       { productVariationSize: { productName: "Product 1" }, price: 50 },
//       { productVariationSize: { productName: "Product 2" }, price: 50 },
//     ],
//   },
//   {
//     orderId: 2,
//     user: { username: "Jane Smith", phone: "987654321" },
//     orderTotalPrice: 200,
//     ordersStatus: "processing",
//     denormalizedAddress: "456 Oak Ave",
//     createdAt: new Date("2023-06-02"),
//     orderLines: [
//       { productVariationSize: { productName: "Product 3" }, price: 100 },
//       { productVariationSize: { productName: "Product 4" }, price: 100 },
//     ],
//   },
//   {
//     orderId: 3,
//     user: { username: "Jane Smith", phone: "987654321" },
//     orderTotalPrice: 200,
//     ordersStatus: "processing",
//     denormalizedAddress: "456 Oak Ave",
//     createdAt: new Date("2023-06-02"),
//     orderLines: [
//       { productVariationSize: { productName: "Product 3" }, price: 100 },
//       { productVariationSize: { productName: "Product 4" }, price: 100 },
//     ],
//   },
//   {
//     orderId: 4,
//     user: { username: "Jane Smith", phone: "987654321" },
//     orderTotalPrice: 200,
//     ordersStatus: "processing",
//     denormalizedAddress: "456 Oak Ave",
//     createdAt: new Date("2023-06-02"),
//     orderLines: [
//       { productVariationSize: { productName: "Product 3" }, price: 100 },
//       { productVariationSize: { productName: "Product 4" }, price: 100 },
//     ],
//   },
//   {
//     orderId: 2,
//     user: { username: "Jane Smith", phone: "987654321" },
//     orderTotalPrice: 200,
//     ordersStatus: "processing",
//     denormalizedAddress: "456 Oak Ave",
//     createdAt: new Date("2023-06-02"),
//     orderLines: [
//       { productVariationSize: { productName: "Product 3" }, price: 100 },
//       { productVariationSize: { productName: "Product 4" }, price: 100 },
//     ],
//   },
//   {
//     orderId: 2,
//     user: { username: "Jane Smith", phone: "987654321" },
//     orderTotalPrice: 200,
//     ordersStatus: "processing",
//     denormalizedAddress: "456 Oak Ave",
//     createdAt: new Date("2023-06-02"),
//     orderLines: [
//       { productVariationSize: { productName: "Product 3" }, price: 100 },
//       { productVariationSize: { productName: "Product 4" }, price: 100 },
//     ],
//   },
//   // Thêm các đơn hàng khác tại đây...
// ]);


const filterKeyword = ref('');
const filterStatus = ref('');
const statusOptions = [
  { label: 'Chưa xử lý', value: 'Chưa xử lý' },
  { label: 'Đang xử lý', value: 'Đang xử lý' },
  { label: 'Hoàn thành', value: 'Hoàn thành' },
];

const dialogVisible = ref(false);
const currentOrder = ref<OrderType | null>(null);
const isEditing = ref(false);

// Computed property for filtered orders based on filterKeyword and filterStatus
const filteredOrders = computed(() => {
  let filtered = orders.value;
  if (filterKeyword.value) {
    const keyword = filterKeyword.value.toLowerCase();
    filtered = filtered.filter((order) => order.user.username.toLowerCase().includes(keyword));
  }
  if (filterStatus.value) {
    filtered = filtered.filter((order) => order.ordersStatus === filterStatus.value);
  }
  return filtered;
});

// Custom sort function for sorting columns
function customSort(event: any) {
  const { field, order } = event.multiSortMeta[0];
  if (field) {
    const factor = order === 1 ? 1 : -1;
    filteredOrders.value.sort((order1, order2) => {
      const value1 = getFieldData(order1, field);
      const value2 = getFieldData(order2, field);
      return factor * value1.localeCompare(value2, undefined, { numeric: true });
    });
  }
}

// Helper function to get field data for sorting
function getFieldData(order: OrderType, field: string) {
  switch (field) {
    case 'orderId':
    case 'orderTotalPrice':
      return String(order[field]);
    case 'user.username':
    case 'ordersStatus':
      return order[field].toLowerCase();
    default:
      return '';
  }
}

function applyFilters() {
  const keyword = filterKeyword.value.toLowerCase();
  const status = filterStatus.value;

  filteredOrders.value = orders.value.filter((order) => {
    const isKeywordMatched = order.user.username.toLowerCase().includes(keyword);
    const isStatusMatched = !status || order.ordersStatus === status;
    return isKeywordMatched && isStatusMatched;
  });
}

// Hàm đặt lại bộ lọc
function resetFilters() {
  filterKeyword.value = '';
  filterStatus.value = '';
  filteredOrders.value = orders.value;
}

</script>

<style scoped>
.order-list {
  padding: 20px;
}

.order-list__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.order-list__filters {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.order-list__dialog {
  max-width: 600px;
}

.order-list__dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
}

.status-pending {
  background-color: #ffc107;
}

.status-processing {
  background-color: #007bff;
}

.status-completed {
  background-color: #28a745;
}
</style>
