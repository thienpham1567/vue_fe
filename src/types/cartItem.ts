import { ProductType } from '@/types/product';
import type { ProductVariationSizeType } from "@/types/productVariationSize";
import type { CartType } from "@/types/cart";
import { ColorType } from '@/types/color';

export interface CartItemType {
    cartItemId?: number;
    productVariationSize?: ProductVariationSizeType;
    product: ProductType;
    color: ColorType
    cart?: CartType;
    price?: number;
    quantity?: number;
    imageUrl?: string;
}

export interface CreationParams {
    productVariationSize?: ProductVariationSizeType;
    product?: ProductType;
    color?: ColorType
    cartId?: String;
    quantity?: number;
    imageUrl?: string;
}