import type { ProductVariationType } from "./productVariation";
import type { SizeType } from "./size";

export interface ProductVariationSizeType {
  productVariationSizeId?: number;
  productVariation: ProductVariationType;
  size: SizeType;
  quantity: number;
}

export interface CreationParams {
}

export type UpdateParams = Omit<ProductVariationSizeType, "id">;

export interface CreationResponse {
  status: boolean;
  data: { id: number };
  message?: string;
}

export interface ProductItemResponse {
  status: boolean;
  data?: ProductVariationSizeType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: ProductVariationSizeType[];
  message?: string;
}