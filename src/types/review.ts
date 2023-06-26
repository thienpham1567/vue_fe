import type { ProductVariationType } from "./productVariation";
import type { UserType } from "./user";

export interface ReviewType {
    reviewId?: number;
    userId?: UserType;
    productVariationId?: ProductVariationType;
    content?: string;
    rateStar?: number;
    createdAt?: Date;
}

export interface CreationParams {
    name?: string;
    parentCategoryId?: number;
}

export type UpdateParams = Omit<ReviewType, "id">;

export interface CreationResponse {
    status: boolean;
    data: ReviewType;
    message?: string;
}

export interface ReviewResponse {
    status: boolean;
    data?: ReviewType;
    message?: string;
}

export interface ListResponse {
    status: boolean;
    data: ReviewType[];
    message?: string;
}