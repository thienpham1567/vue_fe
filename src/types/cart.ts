import type { UserType } from "./user";

export interface CartType {
    cartId?: number;
    user: UserType;
    itemTotalQuantity: number;
    itemSubtotalPrice: number;
}