import { ref, computed , Ref} from 'vue';
import Order from '@/models/Order';
import Cart from "@/models/Cart";
import type { OrderType, CreationParams, UpdateParams } from '@/types/order';
import { UserType } from '@/types/user';
import { CartType } from "@/types/cart";
import Payment from "@/models/Paypal";
import { defineStore } from "pinia";

const useOrderStore =  defineStore("order", () => {
  // State
  const orders:  Ref<OrderType[]> = ref([]);
  const order: Ref<OrderType> = ref({});
  const cart: Ref<CartType> = ref({});

  // Getters
  const getOrders = computed(() => orders);
  const getOrder = computed(() => order);
  const getCart = computed(() => cart);

  // Actions
  const fetchOrders = async (user?: number) => {
    const { data } = await new Order().list({
      user: user as UserType
    });
    setOrders(data);
  };


  const fetchOrderByCartId = async (cartId? : number) => {
    const cartIdFromLocalStorage = cart.value.cartId! ?? localStorage.getItem("cartId");
    if (cartIdFromLocalStorage !== null) {
      const { data } = await new Order().order({ cartId: cartIdFromLocalStorage! });
      setOrders(data);
  }
  };

  const fetchOrdersById = async (userId?: number) => {
    const { data } = await new Order().listbyid({ userId });
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
    fetchOrdersById,
    fetchOrderByCartId
  };
});

export default useOrderStore;
