import type { ProductType } from "./product";

export interface ProductVariationType {
  product?: ProductType;
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