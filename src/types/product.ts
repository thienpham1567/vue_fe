import type { BrandType } from "./brand";
import type { CategoryType } from "./category";

export interface ProductType {
  productId?: number;
  brand?: BrandType;
  category: CategoryType;
  name?: string;
  price?: number;
  sku?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreationParams {
  name?: string;
  description?: string;
  brandId?: number;
  categoryId?: number;
}

export type UpdateParams = Omit<ProductType, "id">;

export interface CreationResponse {
  status: boolean;
  data: { id: number };
  message?: string;
}

export interface ProductResponse {
  status: boolean;
  data?: ProductType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: ProductType[];
  message?: string;
}
