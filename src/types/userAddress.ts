import type { UserType } from "./user";
import type { AddressType } from "./address";

export interface UserAddressType {
    userAddressId?: number;
    user?: UserType;
    address?: AddressType;
    isDefault?: boolean;
}

export interface CreationParams {
    userId?: number;
    addressId?: number;
    isDefault?: boolean
}

export type UpdateParams = Omit<UserAddressType, "useraddressId">;

export interface CreationResponse {
    status: boolean;
    data: UserAddressType;
    message?: string;
}

export interface UserAddressResponse {
    status: boolean;
    data?: UserAddressType;
    message?: string;
}

export interface ListResponse {
    status: boolean;
    data: UserAddressType[];
    message?: string;
}

export interface QueryUserAddressParams {
    userId: number;
    isDefault: boolean;
}