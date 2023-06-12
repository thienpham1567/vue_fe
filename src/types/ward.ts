import type { DistrictType } from "./district";
import type { ProvinceType } from "./province";

export interface WardType {
    wardId?: number;
    district?: DistrictType;
    province?: ProvinceType;
    name?: string;
    prefix?: string;
}