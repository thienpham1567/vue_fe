import Size from "@/models/Size";
import type { SizeType } from "@/types/size";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { computed } from "vue";

const useSizeStore = defineStore("size", () => {
    // State
    const sizes: Ref<SizeType[]> = ref([]);

    const kidSizes: string[] = ["3","3.5","4","4.5","5","5.5","6","6.7"];

    const adultSizes: string[] = ["7","7.5","8","8.5","9","9.5","10","10.5","11","11.5","12","12.5","13"];

    const clothingSizes: string[] = ["XS","S","M","L","XL","XXL"]

    // Getters
    const getSizes = computed(() => sizes);

    // Action
    const fetchBrands = async () => {
        const { data } = await new Size().list();
        setSizes(data);
    };

    const setSizes = (newSizes: SizeType[]) => (sizes.value = newSizes);

    return {
        fetchBrands,
        getSizes,
        kidSizes,
        adultSizes,
        clothingSizes,
    };
});

export default useSizeStore;