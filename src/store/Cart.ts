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

    // Getters
    const getCartItems = computed(() => cartItems);
    const getCart = computed(() => cart);


    // Actions
    const fetchCart = async () => {
        const cartIdFromLocalStorage = cart.value.cartId! ?? localStorage.getItem("cartId");
        if (cartIdFromLocalStorage !== null) {
            const { data } = await new Cart().list({ cartId: cartIdFromLocalStorage! });
            cart.value = data!;
            cartItems.value = data?.cartItems ?? [];
        }
    }

    const addUpdateToCart = async (cartItem: CreationParams) => {
        const cartIdFromLocalStorege = localStorage.getItem("cartId");
        if (cartIdFromLocalStorege !== null) {
            cartItem.cartId = cartIdFromLocalStorege;
            const { data } = await new Cart().create(cartItem);
            cart.value = data!;
            cartItems.value = data?.cartItems ?? [];
        } else {
            const { data } = await new Cart().create(cartItem);
            cart.value = data!;
            cartItems.value = data?.cartItems ?? [];
            localStorage.setItem("cartId", cart.value.cartId!);
        }
    };

    const removeItemFromCart = async (cartItemId: number) => {
        const cartId = cart.value.cartId! ?? localStorage.getItem("cartId");
        const { data } = await new Cart().delete(cartId, cartItemId);
        cart.value = data!;
        cartItems.value = data?.cartItems ?? [];
    };

    return {
        getCart,
        getCartItems,
        fetchCart,
        addUpdateToCart,
        removeItemFromCart
    };
});

export default useCartStore;