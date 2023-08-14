import { DistrictType } from "./district";
import { ProvinceType } from "./province";
import { WardType } from "./ward";

export interface AddressType {
  addressId?: number;
  address?: string;
  ward?: WardType;
  district?: DistrictType;
  province?: ProvinceType;
}

export interface CreationParams {
  address: string;
  wardId: number;
  districtId: number;
  provinceId: number;
}

export type UpdateParams = Omit<AddressType, "addressId">;

export interface CreationResponse {
  status: boolean;
  data: AddressType;
  message?: string;
}

export interface AddressResponse {
  status: boolean;
  data?: AddressType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: AddressType[];
  message?: string;
}
