import type { ProductVariationType } from "./productVariation";

export interface ProductImagesType {
    productImagesId?: number;
    imageUrl?: string;
    isPrimary?: boolean;
    productVariation?: ProductVariationType;
}