import type { UserType } from "./user";
import type { AddressType } from "./address";

export interface UserAddressType {
    userAddressId?: number;
    user?: UserType;
    address?: AddressType;
    isDefault?: boolean;
}