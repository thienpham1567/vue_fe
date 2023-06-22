import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { computed } from "vue";
import { ProductVariationType } from "@/types/productVariation";
import Product from "@/models/Product";

const useProductStore = defineStore("product", () => {
  // State
  const productList: Ref<ProductVariationType[]> = ref([]);
  const product: Ref<ProductVariationType> = ref({});

  // Getters
  const getProducts = computed(() => productList);
  const getProduct = computed(() => product);

  // Actions
  const fetchAllProducts = async (brand?: number, category?: number) => {
    const { data } = await new Product().list({ brand, category });
    productList.value = data;
  };

  const fetchOneProduct = async (id: number) => {
    const { data } = await new Product().detail(id);
    product.value = data!;
    console.log(data);
    
  };

  return { getProduct, getProducts, fetchAllProducts, fetchOneProduct };
});

export default useProductStore;
