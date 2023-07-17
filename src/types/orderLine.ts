import type { ProductVariationSizeType } from "./productVariationSize";
import type { OrderType } from "./order";

export interface OrderLineType {
    orderLineId?: number;
    productVariationSize: ProductVariationSizeType;
    order?: OrderType;
    price?: number;
    quantity?: number;
}