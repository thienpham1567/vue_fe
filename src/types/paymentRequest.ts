import { CartType } from "./cart";

export interface PaymentRequestType {
    userId?: number;
    denormalizedAddress?: string;
    cart?: CartType;
}