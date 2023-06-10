import type { UserType } from "./user";

export interface OrderType {
    oederId?: number;
    user: UserType;
    createdAt: Date;
    updatedAt: Date;
    denormalizedAddress: string;
    orderTotalPrice: number;
    orderStatus: string;
}