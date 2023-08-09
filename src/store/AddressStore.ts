import Address from "@/models/Address";
import type { AddressType } from "@/types/address";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { computed } from "vue";

const useAddressStore = defineStore("address", () => {
    // State
    const addresses: Ref<AddressType[]> = ref([]);
    const address: Ref<AddressType | undefined> = ref();

    // Getters
    const getAddresses = computed(() => addresses);
    const getAddress = computed(() => address);

    // Setters
    const setAddresses = (newAddresses: AddressType[]) => (addresses.value = newAddresses);
    const setAddress = (newAddress: AddressType) => (address.value = newAddress);

    // Action
    const fetchAddresses = async () => {
        const { data } = await new Address().list();
        setAddresses(data);
    };

    const fetchAddress = async (id: number) => {
        const { data } = await new Address().detail(id);
        setAddress(data!);
    };

    return {
        fetchAddresses,
        fetchAddress,
        getAddresses,
        getAddress,
    };
});

export default useAddressStore;