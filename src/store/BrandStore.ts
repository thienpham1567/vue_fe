import Brand from "@/models/Brand";
import type { UpdateParams } from "@/types/brand";
import type { BrandType, CreationParams } from "@/types/brand";
import { ref, computed, Ref } from "vue";

const useBrandStore = () => {
  // State
  let brands: Ref<BrandType[]> = ref([]);
  let brand: Ref<BrandType> = ref({});

  // Getters
  const getBrands = computed(() => brands.value);
  const getBrand = computed(() => brand.value);

  // Action
  const fetchBrands = async () => {
    const { data } = await new Brand().list();
    brands.value = data;
  };

  const addBrand = async (brand: CreationParams) => {
    const { data } = await new Brand().create(brand);
    brands.value.push(data);
  };

  const updateBrand = async (id: number, updatedBrand: UpdateParams) => {
    await new Brand().update(id, updatedBrand);
    brand.value = {};
    fetchBrands();
  };

  const deleteBrand = async (id: number) => {
    await new Brand().delete(id);
    brand.value = {};
    fetchBrands();
  };

  return {
    getBrand,
    getBrands,
    fetchBrands,
    addBrand,
    updateBrand,
    deleteBrand,
  };
};

export default useBrandStore;
