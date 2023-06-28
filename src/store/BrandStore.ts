import Brand from "@/models/Brand";
import type { UpdateParams } from "@/types/brand";
import type { BrandType, CreationParams } from "@/types/brand";
import { ref, computed } from "vue";

const useBrandStore = () => {
  // State
  const brands = ref<BrandType[]>([]);
  const brand = ref<BrandType>({});

  // Getters
  const getBrands = computed(() => brands.value);
  const getBrand = computed(() => brand.value);

  // Action
  const fetchBrands = async () => {
    const { data } = await new Brand().list();
    setBrands(data);
  };

  const addBrand = async (brand: CreationParams) => {
    const { data } = await new Brand().create(brand);
    brands.value.push(data);
  };

  const updateBrand = async (id: number, brand: UpdateParams) => {
    await new Brand().update(id, brand);
    setBrand({});
    fetchBrands();
  };

  const deleteBrand = async (id: number) => {
    await new Brand().delete(id);
    setBrand({});
    fetchBrands();
  };

  const setBrands = (newBrands: BrandType[]) => (brands.value = newBrands);

  const setBrand = (newBrand: BrandType) => (brand.value = newBrand);

  return {
    getBrand,
    getBrands,
    fetchBrands,
    addBrand,
    updateBrand,
    deleteBrand,
    setBrand,
  };
};

export default useBrandStore;
