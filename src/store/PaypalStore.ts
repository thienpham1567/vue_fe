import { ref, computed } from 'vue';
import Order from '@/models/Order';
import type { OrderType, CreationParams, UpdateParams } from '@/types/order';
import { UserType } from '@/types/user';

const usePaypalStore = () => {
  // State
  const payment = ref<OrderType[]>([]);
  const order = ref<OrderType>({});

  // Getters
  const getOrders = computed(() => orders.value);
  const getOrder = computed(() => order.value);

  // Actions
  const fetchPayment = async (user?: number) => {
    const { data } = await new Order().list({
      user: user as UserType
    });
    setOrders(data);
  };

  const fetchPaymentByCartId = async (cartId?: number) => {
    const { data } = await new Order().listbyid({ cartId });
    setOrders(data);
  };

  const addOrder = async (order: CreationParams) => {
    const { data } = await new Order().create(order);
    orders.value.push(data);
  };

  const updateOrder = async (orderId: string, order: UpdateParams) => {
    await new Order().update(orderId, order);
    setOrder({});
    fetchOrders();
  };

  const deleteOrder = async (orderId: string) => {
    await new Order().delete(orderId);
    setOrder({});
    fetchOrders();
  };

  const setOrder = (newOrder: OrderType) => {
    order.value = newOrder;
  };

  const setOrders = (newOrders: OrderType[]) => {
    orders.value = newOrders;
  };

  return {
    getOrder,
    getOrders,
    fetchOrders,
    addOrder,
    updateOrder,
    deleteOrder,
    setOrder,
    fetchOrdersById
  };
};

export default useOrderStore;
