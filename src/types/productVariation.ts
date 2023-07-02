import { ProductImagesType } from './productImages';
import { ProductVariationSizeType } from './productVariationSize';
import type { ProductType } from "./product";
import type { ColorType } from "./color";

export interface ProductVariationType {
  productVariationId?: number;
  product?: ProductType;
  color?: ColorType;
  productVariationSizes?: ProductVariationSizeType[];
  productImages?: ProductImagesType[];
}

export interface CreationProductVariationParams {
  color?: ColorType;
  product?: ProductType;
}

export type UpdateParams = Omit<ProductVariationType, "id">;

export interface CreationResponse {
  status: boolean;
  data: { id: number };
  message?: string;
}

export interface ProductVariationResponse {
  status: boolean;
  data?: ProductVariationType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: ProductVariationType[];
  message?: string;
}

export interface QueryProductVariationParams {
  brand?: number;
  category?: number;
  productId?: number;
}