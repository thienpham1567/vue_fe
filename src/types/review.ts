import type { ProductType } from "./product";
import type { UserType } from "./user";

export interface ReviewType {
    reviewId?: number;
    product?: ProductType;
    user?: UserType;
    rateValue?: number;
    comment?: string;
}