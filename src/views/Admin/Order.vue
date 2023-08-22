<template>
  <div class="">
    <h1 class="flex font-bold text-4xl justify-center mb-4">DANH SÁCH ĐƠN HÀNG</h1>
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
      <Column field="orderTotalPrice" header="Tổng số tiền" sortable="custom" :sort-function="customSort">
        <template #body="rowData">
          {{ priceInVND(rowData.data.orderTotalPrice) }} VND
        </template>
      </Column>
      <Column field="ordersStatus" header="Trạng thái" :body="statusBodyTemplate" sortable="custom"
        :sort-function="customSort">
        <template #body="rowData">
          <span :class="getStatusBadgeClass(rowData.data.ordersStatus)">
            {{ rowData.data.ordersStatus }}
          </span>
        </template>
      </Column>
      <Column header="Xem đơn hàng" :body="viewOrderTemplate">
        <template #body="rowData">
          <div class="category-list__actions">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success"
              @click="openOrderDialog(rowData.data)"></Button>
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog v-model="dialogVisible" :visible="dialogVisible" class="order-list__dialog">
      <div class="centered-text">
        <h1>{{ dialogHeader }}</h1>
      </div>
      <div class="p-fluid">
        <div class="p-field">
          <label for="orderId">ID đơn hàng</label>
          <InputText id="orderId" v-model="currentOrder.orderId" :disabled="isEditing"></InputText>
        </div>
        <div class="p-field">
          <label for="customerName">Tên khách hàng</label>
          <InputText id="customerName" v-model="formattedName" :disabled="isEditing"></InputText>
        </div>
        <!-- <div class="p-field">
          <label for="customerAddress">Địa chỉ khách hàng</label>
          <InputText id="customerAddress" v-model="currentOrder.denormalizedAddress" :disabled="isEditing"></InputText>
        </div> -->
        <div class="p-field">
          <label for="customerPhone">Số điện thoại</label>
          <InputText id="customerPhone" v-model="currentOrder.user.phoneNumber" :disabled="isEditing"></InputText>
        </div>
        <div class="p-field">
          <label for="orderDate">Ngày đặt hàng</label>
          <Calendar id="orderDate" v-model="formattedDate" :disabled="isEditing"></Calendar>
        </div>
        <div class="p-field">
          <label for="customerStatus">Trạng thái</label>
          <InputText id="customerStatus" v-model="currentOrder.ordersStatus"></InputText>
        </div>
        <div class="p-field">
          <label for="products">Danh sách sản phẩm</label>
          <DataTable :value="currentOrder?.orderLines">
            <Column field="productVariationSize.productVariation.product.name" header="Tên sản phẩm"></Column>
            <Column field="imageUrl" header="Hình">
              <template #body="Props">
                <img :src="Props.data.imageUrl" style="width: 100px; height: 100px;" alt="image">
              </template>
            </Column>
            <Column field="price" header="Giá">
              <template #body="rowData">
                <div class="vnd">{{ priceInVND(rowData.data.price) }} VND</div>
              </template>
            </Column>
            <Column field="quantity" header="Số lượng"></Column>
          </DataTable>
        </div>
      </div>

      <template #footer>
        <div class="order-list__dialog-buttons">
          <!-- <Button class="p-button p-button-success" label="Lưu" @click="saveOrder"></Button> -->
          <Button class="p-button p-button-secondary" label="Hủy" @click="cancelEdit"></Button>
        </div>
      </template>
    </Dialog>
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
import moment from 'moment';

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


// xử lí hiển thị cho TRẠNG THÁI
const filterKeyword = ref('');
const filterStatus = ref('');
const statusOptions = [
  { label: 'Chưa xử lý', value: 'Chưa xử lý' },
  { label: 'Đang xử lý', value: 'Đang xử lý' },
  { label: 'Hoàn thành', value: 'Hoàn thành' },
];
function getStatusBadgeClass(status) {
  switch (status) {
    case 'Chưa xử lý':
      return 'status-pending';
    case 'Đang xử lý':
      return 'status-processing';
    case 'Hoàn thành':
      return 'status-completed';
    default:
      return '';
  }
}


const dialogVisible = ref(false);
const currentOrder = ref<OrderType | null>(null);
const isEditing = ref(true);


const formattedDate = computed(() => {
  if (currentOrder.value && currentOrder.value.createdAt) {
    const datetime = moment(currentOrder.value.createdAt, 'YYYY-MM-DD HH:mm:ss.SSSSSS');
    return datetime.format('YYYY-MM-DD HH:mm:ss');
  }
  return null;
});

const formattedName = computed(() => {
  if (currentOrder.value && currentOrder.value.user && currentOrder.value.user.firstName && currentOrder.value.user.lastName) {
    return currentOrder.value.user.firstName + ' ' + currentOrder.value.user.lastName;
  }
  return null;
});



// const formattedDate = computed(() => {
//   if (currentOrder.value && currentOrder.value.createdAt) {
//     const dateObj = new Date(currentOrder.value.createdAt);
//     return dateObj.toISOString().split('T')[0];
//   }
//   return null;
// });

// const formattedDate = computed(() => {
//   if (currentOrder.value && currentOrder.value.createdAt) {
//     const parts = currentOrder.value.createdAt.split(/[- :]/);
//     const year = parseInt(parts[0]);
//     const month = parseInt(parts[1]) - 1;
//     const day = parseInt(parts[2]);
//     const dateObj = new Date(year, month, day);
//     return dateObj.toISOString().split('T')[0];
//   }
//   return null;
// });

// const formattedDate = computed(() => {
//   if (currentOrder.value && typeof currentOrder.value.createdAt === 'string') {
//     const parts = currentOrder.value.createdAt.split(' ');
//     return parts[0];
//   }
//   return null;
// });

// const formattedDate = computed(() => {
//   if (currentOrder.value && currentOrder.value.createdAt) {
//     const dateObj = new Date(currentOrder.value.createdAt);
//     const year = dateObj.getFullYear();
//     const month = String(dateObj.getMonth() + 1).padStart(2, '0');
//     const day = String(dateObj.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }
//   return null;
// });


const openOrderDialog = (order: OrderType) => {
  currentOrder.value = { ...order };
  dialogHeader.value = `Thông tin đơn hàng #${order.orderId}`;
  dialogVisible.value = true;
};

// Computed property for filtered orders based on filterKeyword and filterStatus
const filteredOrders = computed(() => {
  let filtered = orders.value;
  if (filterKeyword.value) {
    const keyword = filterKeyword.value.toLowerCase();
    filtered = filtered.filter((order) => order.user?.lastName.toLowerCase().includes(keyword));
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

// Reset the filters
function resetFilters() {
  filterKeyword.value = '';
  filterStatus.value = '';
  filteredOrders.value = orders.value;
}


const cancelEdit = () => {
  currentOrder.value = {};
  dialogVisible.value = false;
};

// dola to vnd
const priceInVND = computed(() => {
  const exchangeRate = 24000; // Tỷ giá: 1 USD = 24000 VND

  return (usdPrice) => {
    const vndPrice = usdPrice * exchangeRate;
    return vndPrice.toLocaleString('en-US'); // Định dạng số với dấu phẩy
  };
});
</script>

<style scoped>
.status-pending {
  background-color: #ffc107;
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
}

.status-processing {
  background-color: #007bff;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
}

.status-completed {
  background-color: #28a745;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
}

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

.p-dropdown .p-dropdown-label {
  font-size: 13px;
  font-weight: 600;
  padding: 0 !important;
}

.order-list__dialog {
  max-width: 600px;
}

.order-list__dialog-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.p-dropdown {
  height: 49.6px;
  width: 206.4px;
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

.order-list__dialog {
  /* Căn giữa dialog */
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-header {
  /* Căn giữa nội dung của header */
  text-align: center;
}

.centered-text {
  /* Căn giữa và làm đậm phần hiển thị dialogHeader */
  text-align: center;
  font-weight: bold;
  color: black;
  font-size: 24px;
  /* Tăng kích thước của thẻ div */
}
</style>
