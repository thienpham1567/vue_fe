<template>
  <div class="order-confirmation">
    <h1 class="title">Order Confirmation</h1>
    <div class="order-details">
      <p><strong>Order Number:</strong> {{ order.orderNumber }}</p>
      <p><strong>Order Date:</strong> {{ order.orderDate }}</p>
      <p><strong>Payment Method:</strong> {{ order.paymentMethod }}</p>
      <p><strong>Total Amount:</strong> ${{ order.totalAmount }}</p>
      <p><strong>Shipping Cost:</strong> ${{ order.shippingCost }}</p>
    </div>
    <h2 class="section-title">Order Items:</h2>
    <ul class="order-items">
      <li v-for="(item, index) in order.orderItems" :key="index">
        <div class="item-details">
          <img :src="item.imageUrl" alt="Product Image" />
          <div class="item-info">
            <p><strong>Product Name:</strong> {{ item.productName }}</p>
            <p><strong>Price:</strong> ${{ item.price }}</p>
            <p><strong>Quantity:</strong> {{ item.quantity }}</p>
          </div>
        </div>
      </li>
    </ul>
    <button @click="goToOrderHistory">View Order History</button>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
import { ref, computed, onMounted } from 'vue';

onMounted(async () => {
  try {
    console.log(userId);
    await orderStore.fetchOrdersById(userId);
    orders.value = orderStore.getOrders.value;
    console.log(orders.value);
    
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Handle error
  }
});
const order = ref({
  orderNumber: "123456",
  orderDate: "2023-08-18",
  paymentMethod: "PayPal",
  totalAmount: 150.00,
  shippingCost: 10.00,
  orderItems: [
    {
      imageUrl: "path/to/image1.jpg",
      productName: "Product 1",
      price: 50.00,
      quantity: 2
    },
    {
      imageUrl: "path/to/image2.jpg",
      productName: "Product 2",
      price: 30.00,
      quantity: 3
    },
    // Add more order items here
  ]
});

const goToOrderHistory = () => {
  // Redirect to order history page
  // Replace with actual route or URL
  router.push("/order-history");
};
</script>

<style scoped>
.order-confirmation {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  border: 2px solid #333; /* Viền xung quanh */
  background-color: #f5f5f5; /* Màu xám nền */
}

.title {
  color: #1e88e5; /* Màu đậm cho tiêu đề */
}

.section-title {
  margin-top: 20px;
  color: #4caf50; /* Màu đậm cho tiêu đề phần */
}

.order-details {
  margin-bottom: 20px;
}

.order-items {
  list-style: none;
  padding: 0;
}

.item-details {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.item-details img {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}

.item-info {
  text-align: left;
}
</style>
