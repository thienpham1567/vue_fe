import type { ProductType } from "./product";

export interface ProductVariationSizeType {
  product?: ProductType;
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