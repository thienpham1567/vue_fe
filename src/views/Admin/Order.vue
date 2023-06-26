<template>
    <div class="order-list">
      <h1 class="order-list__title">Danh sách đơn hàng</h1>
  
      <div class="order-list__table">
        <DataTable :value="orders" :paginator="true" :rows="10" :rows-per-page-options="[5, 10, 25]">
          <Column field="orderId" header="ID đơn hàng"></Column>
          <Column field="customerName" header="Tên khách hàng"></Column>
          <Column field="totalAmount" header="Tổng số tiền"></Column>
          <Column field="status" header="Trạng thái"></Column>
          <Column header="Thao tác">
            <template #body="rowData">
              <Button class="p-button p-button-sm p-button-info" label="Sửa" @click="editOrder(rowData)"></Button>
            </template>
          </Column>
        </DataTable>
      </div>
  
      <Dialog v-model="dialogVisible" :visible="dialogVisible" :header="dialogHeader" class="order-list__dialog">
        <div class="p-fluid">
          <div class="p-field">
            <label for="orderId">ID đơn hàng</label>
            <InputText id="orderId" v-model="currentOrder.orderId" :disabled="isEditing"></InputText>
          </div>
          <div class="p-field">
            <label for="customerName">Tên khách hàng</label>
            <InputText id="customerName" v-model="currentOrder.customerName"></InputText>
          </div>
          <div class="p-field">
            <label for="customerAddress">Địa chỉ khách hàng</label>
            <InputText id="customerAddress" v-model="currentOrder.customerAddress"></InputText>
          </div>
          <div class="p-field">
            <label for="orderDate">Ngày đặt hàng</label>
            <Calendar id="orderDate" v-model="currentOrder.orderDate"></Calendar>
          </div>
          <div class="p-field">
            <label for="products">Danh sách sản phẩm</label>
            <DataTable :value="currentOrder.products">
              <Column field="productName" header="Tên sản phẩm"></Column>
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
  import { ref } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import Calendar from 'primevue/calendar';
  
  interface Product {
    productName: string;
    price: number;
  }
  
  interface Order {
    orderId: number;
    customerName: string;
    customerAddress: string;
    orderDate: Date;
    products: Product[];
  }
  
  const dialogHeader = ref('');
  const orders = ref<Order[]>([
    {
      orderId: 1,
      customerName: 'Nguyễn Văn A',
      customerAddress: 'Số 123, Đường ABC, Thành phố XYZ',
      orderDate: new Date(),
      products: [
        { productName: 'Sản phẩm A', price: 100 },
        { productName: 'Sản phẩm B', price: 200 },
      ],
    },
    {
      orderId: 2,
      customerName: 'Trần Thị B',
      customerAddress: 'Số 456, Đường DEF, Thành phố XYZ',
      orderDate: new Date(),
      products: [
        { productName: 'Sản phẩm C', price: 150 },
        { productName: 'Sản phẩm D', price: 250 },
      ],
    },
  ]);
  const dialogVisible = ref(false);
  const currentOrder = ref<Order>({
    orderId: 0,
    customerName: '',
    customerAddress: '',
    orderDate: new Date(),
    products: [],
  });
  let isEditing = false;
  
  function addOrder() {
    isEditing = false;
    currentOrder.value = {
      orderId: 0,
      customerName: '',
      customerAddress: '',
      orderDate: new Date(),
      products: [],
    };
    dialogVisible.value = true;
    dialogHeader.value = 'Thêm đơn hàng';
  }
  
  function editOrder(order: Order) {
    isEditing = true;
    currentOrder.value = { ...order };
    dialogVisible.value = true;
    dialogHeader.value = 'Sửa đơn hàng';
  }
  
  function saveOrder() {
    if (isEditing) {
      // Gọi API để cập nhật đơn hàng
      // axios.put(...)
      //   .then(() => {
      //     fetchOrders();
      //     cancelEdit();
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    } else {
      // Gọi API để thêm đơn hàng mới
      // axios.post(...)
      //   .then(() => {
      //     fetchOrders();
      //     cancelEdit();
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    }
  }
  
  function cancelEdit() {
    dialogVisible.value = false;
    currentOrder.value = {
      orderId: 0,
      customerName: '',
      customerAddress: '',
      orderDate: new Date(),
      products: [],
    };
  }
  
  // Fetch orders from the server
  // function fetchOrders() {
  //   // axios.get(...)
  //   //   .then((response) => {
  //   //     orders.value = response.data;
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error(error);
  //   //   });
  // }
  
  // onMounted(() => {
  //   fetchOrders();
  // });
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

.order-list__table {
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
  </style>
  