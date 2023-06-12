import type { ProductVariationSizeType } from "./productVariationSize";
import type { CartType } from "./cart";

export interface CartItemType {
    cartItemId?: number;
    productVariationSize?: ProductVariationSizeType;
    cart?: CartType;
    price?: number;
    quantity?: number;
}