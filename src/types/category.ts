export interface CategoryType {
  categoryId?: number;
  parentCategory?: CategoryType;
  name?: string;
  code?: string;
}

export interface CreationParams {
  name?: string;
  parentCategoryId?: number;
}

export type UpdateParams = Omit<CategoryType, "id">;

export interface CreationResponse {
  status: boolean;
  data: CategoryType;
  message?: string;
}

export interface CategoryResponse {
  status: boolean;
  data?: CategoryType;
  message?: string;
}

export interface ListResponse {
  status: boolean;
  data: CategoryType[];
  message?: string;
}
