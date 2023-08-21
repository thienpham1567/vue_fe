<template>
  <div class="order-confirmation">
    <h1 class="title">XÁC NHẬN ĐƠN HÀNG</h1>
    <div class="order-details">
      <p><strong>Ngày thanh toán:</strong> {{ formattedDate }} </p>
      <p><strong>Phương thức thanh toán:</strong> {{ getOrder.price }} Paypal </p>
      <p><strong>Tổng tiền:</strong> {{ priceInVND(getOrder.orderTotalPrice) }} VND </p>
      <p><strong>Tiền ship:</strong> 0.0 </p>
    </div>
    <Button class="cart-btn" @click="goToOrder">View Order History</Button>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
import Order from '@/models/Order';
import useCartStore from '@/store/Cart';
import useOrderStore from '@/store/OrderStore';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment';
import Button from 'primevue/button';


const { fetchOrderbyCartId, getOrder } = useOrderStore();
const id = localStorage.getItem('cartId');
const router = useRouter();


const deleteCartItems = () => {
  const cartIdFromLocalStorage = localStorage.getItem("cartId");
  deleteCartItem(cartIdFromLocalStorage).then(() => {
    localStorage.removeItem("cartId");
  });

}; 
const deleteCartItem = async (cartItemId) => {
 
};

onMounted(() => {
  fetchOrderbyCartId(id).then(() => { 
    deleteCartItems();
  });
});

const formattedDate = computed(() => {
  if (getOrder.value && getOrder.value.createdAt) {
    const datetime = moment(getOrder.value.createdAt, 'YYYY-MM-DD HH:mm:ss.SSSSSS');
    return datetime.format('YYYY-MM-DD HH:mm:ss');
  }
  return null;
});

const priceInVND = computed(() => {
  const exchangeRate = 24000; // Tỷ giá: 1 USD = 24000 VND
  return (usdPrice) => {
      const vndPrice = usdPrice * exchangeRate;
      return vndPrice.toLocaleString('en-US'); // Định dạng số với dấu phẩy
  };
});

function goToOrder() {
    router.push('/myaccount/view-order');
}










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
