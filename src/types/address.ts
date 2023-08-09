export interface AddressType {
  addressId?: number;
  address?: string;
  ward?: string;
  district?: string;
  province?: string;
}

export interface CreationParams {
  address: string;
  ward: string;
  district: string;
  province: string;
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
