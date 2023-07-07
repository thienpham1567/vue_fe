import Cart from "@/models/Cart";
import { CartType } from "@/types/cart";
import { CartItemType, CreationParams } from "@/types/cartItem";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { computed } from "vue";

const useCartStore = defineStore("cart", () => {
    // State
    const cartItems: Ref<CartItemType[]> = ref([]);
    const cart: Ref<CartType> = ref({});
    const subTotalPrice: Ref<number> = ref(0);
    const totalQuantity: Ref<number> = ref(0);

    // Getters
    const getCartItems = computed(() => cartItems);
    const getSubTotalPrice = computed(() => subTotalPrice);
    const getTotalQuantity = computed(() => totalQuantity);

    // Actions
    const fetchCarts = async () => {
        const cartIdFromLocalStorage = cart.value.cartId! ?? localStorage.getItem("cartId");
        const { data } = await new Cart().list({ cartId: cartIdFromLocalStorage! });
        cartItems.value = data!;
        subTotalPrice.value = calculateTotalSubPrice();
        totalQuantity.value = calculateTotalQuantity();
    }

    const addUpdateToCart = async (cartItem: CreationParams) => {
        const cartIdFromLocalStorege = localStorage.getItem("cartId");
        if (cartIdFromLocalStorege !== null) {
            cartItem.cartId = cartIdFromLocalStorege;
            const { data } = await new Cart().create(cartItem);
            cart.value = data!;
        } else {
            const { data } = await new Cart().create(cartItem);
            cart.value = data!;
            localStorage.setItem("cartId", cart.value.cartId!);
        }
    };

    const removeItemFromCart = async (cartItemId: number) => {
        const cartId = cart.value.cartId! ?? localStorage.getItem("cartId");
        const { data } = await new Cart().delete(cartId, cartItemId);
        cart.value = data!;
    };

    // watch(cart, () => {
    //     fetchCartItems();
    // });

    const calculateTotalSubPrice = (): number => cartItems.value.reduce((price, item) => price + item.price!, 0);
    const calculateTotalQuantity = (): number => cartItems.value.reduce((quantity, item) => quantity + item.quantity!, 0);

    return {
        getCartItems,
        getSubTotalPrice,
        getTotalQuantity,
        fetchCarts,
        addUpdateToCart,
        removeItemFromCart
    };
});

export default useCartStore;