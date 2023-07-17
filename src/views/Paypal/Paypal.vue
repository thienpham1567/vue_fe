<template>
  <div>
    <h1>PayPal Checkout</h1>
    <label for="amount">Amount:</label>
    <input type="number" id="amount" v-model="amount" />
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    checkout() {
      const payload = {
        itemSubtotalPrice: this.amount,
      };

      axios.post('http://localhost:8080/api/v1/payment/checkout', payload)
        .then(response => {
          // Xử lý phản hồi từ backend khi thanh toán thành công
          console.log(response.data);
        })
        .catch(error => {
          // Xử lý lỗi nếu có
          console.error(error);
        });
    },
  },
};
</script>
