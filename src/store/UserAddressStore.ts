import UserAddress from "@/models/UserAddress";
import type { QueryUserAddressParams, UserAddressType } from "@/types/userAddress";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { computed } from "vue";

const useUserAddressStore = defineStore("userAddress", () => {
    // State
    const userAddresses: Ref<UserAddressType[]> = ref([]);
    const userAddressDefault: Ref<UserAddressType | undefined> = ref();

    // Getters
    const getUserAddresses = computed(() => userAddresses);
    const getUserAddress = computed(() => userAddressDefault);

    // Setters

    // Action
    const fetchUserAddresses = async (params: QueryUserAddressParams) => {
        const { data } = await new UserAddress().list(params);
    };

    const fetchUserAddress = async (id: number) => {
        const { data } = await new UserAddress().detail(id);
    };

    return {
        fetchUserAddresses,
        fetchUserAddress,
        getUserAddresses,
        getUserAddress,
    };
});

export default useUserAddressStore;