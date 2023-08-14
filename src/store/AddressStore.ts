import Address from "@/models/Address";
import type { AddressType } from "@/types/address";
import { DistrictType } from "@/types/district";
import { ProvinceType } from "@/types/province";
import { WardType } from "@/types/ward";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { computed } from "vue";

const useAddressStore = defineStore("address", () => {
    // State
    const addresses: Ref<AddressType[]> = ref([]);
    const address: Ref<AddressType | undefined> = ref();
    let addressString: Ref<string> = ref("");
    let ward: Ref<WardType | undefined> = ref();
    let district: Ref<DistrictType | undefined> = ref();
    let province: Ref<ProvinceType | undefined> = ref();

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

    const setData = (newAddress: string, newWard: WardType, newDistrict: DistrictType, newProvince: ProvinceType) => {
        address.value = {
            address: newAddress,
            ward: newWard,
            district: newDistrict,
            province: newProvince,
        }
    }

    return {
        fetchAddresses,
        fetchAddress,
        getAddresses,
        getAddress,
        setData,
    };
});

export default useAddressStore;