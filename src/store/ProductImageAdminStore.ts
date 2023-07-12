import ProductImage from "@/models/ProductImage";
import { ref, computed } from "vue";
import type { ProductImagesType } from "@/types/productImages";
import ProductVariation from "@/models/ProductVariation";
import type { ProductVariationType } from "@/types/productVariation";


const useProductImageAdminStore = () => {
  // State
  const productImages = ref<ProductImagesType[]>([]);
  const productImage = ref<Partial<ProductImagesType>>({});

  // Getters
  const getproductImages = computed(() => productImages.value);
  const getproductImage = computed(() => productImage.value);

  // Mutations
  const setProductImages = (newProductImages: ProductImagesType[]) => {
    productImages.value = newProductImages;
  };

  const setProductImage = (newProductImage: ProductImagesType) => {
    productImage.value = newProductImage;
  };

  // Actions
  const fetchAllProductImagesAdmin = async (productVariation?: number) => {
    //const { data } = await new Product().productsAdmin({ brand, category });
    const { data } = await new ProductImage().list({
      productVariation: productVariation as ProductVariationType,
    });
    setProductImages(data);
  };

  // const addProductVariation = async (productVariation: CreationProductVariationParams) => {
  //   const { data } = await new ProductVariation().create(productVariation);
  //   productVariations.value.push(data);
  // };

  // const deleteProductVariation = async (id: number) => {
  //   await new ProductVariation().delete(id);
  //   setProductVariation({});
  //   fetchAllProductVariationsAdmin();
  // }

  // const updateProduct = async (id: number, product: UpdateAdminParams) => {
  //   await new Product().update(id, product);
  //   setProduct({});
  //   fetchAllProductsAdmin();
  // };

  return { getproductImage, getproductImages, setProductImage, fetchAllProductImagesAdmin };
};

export default useProductImageAdminStore;
