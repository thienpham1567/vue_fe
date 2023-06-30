import type { CategoryType } from "./category";

export interface SizeType {
    sizeId?: number;
    category?: CategoryType;
    value?: string;
}

export interface ListResponse {
    status: boolean;
    data: SizeType[];
    message?: string;
}