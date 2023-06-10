import type { ProductType } from "./product";
import type { ColorType } from "./color";

export interface ProductVariationType {
  productVariationld?: number;
  product: ProductType;
  color: ColorType;
}

export interface CreationParams {
}

export type UpdateParams = Omit<ProductVariationType, "id">;

export interface CreationResponse {
  status: boolean;
  data: { id: number };
  message?: string;
}

export interface ProductItemResponse {
  status: boolean;
  data?: ProductVariationType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: ProductVariationType[];
  message?: string;
}