import Product from "@/models/Product";
import type { UpdateParams } from "@/types/product";
import type { ProductType, CreationParams } from "@/types/product";
import { ref, computed } from "vue";

const useProductAdminStore = () => {
  // State
  const productsAdmin = ref<ProductType[]>([]);
  const productAdmin = ref<ProductType>({});

  // Getters
  const getProducts = computed(() => productsAdmin.value);
  const getProduct = computed(() => productAdmin.value);

  // Mutations
  const setProducts = (newProducts: ProductType[]) => {
    productsAdmin.value = newProducts;
  };

  const setProduct = (newProduct: ProductType) => {
    productAdmin.value = newProduct;
  };

  // Actions
  const fetchAllProductsAdmin = async (brand?: number, category?: number) => {
    const { data } = await new Product().productsAdmin({ brand, category });
    setProducts(data);
  };

  const fetchAllProducts = async (brand?: number, category?: number) => {
    const { data } = await new Product().list({ brand, category });
    productList.value = data.filter((product, index, productList) => {
      return productList.map(product => product.product?.productId).indexOf(product.product?.productId) === index;
    })
  };

  const fetchOneProduct = async (id: number) => {
    const { data } = await new Product().detail(id);
    product.value = data!;
  };

  return { getProduct, getProducts, fetchAllProducts, fetchOneProduct, fetchAllProductsAdmin };
};

export default useProductAdminStore;
