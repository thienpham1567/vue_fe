import type { ProvinceType } from "./province";

export interface DistrictType {
    districtId?: number;
    province?: ProvinceType;
    name?: string;
    prefix?: string;
}