import type { UserType } from "./user";
import type { OrderLineType } from "./orderLine";
export interface OrderType {
    orderId?: string;
    denormalizedAddress?: string;
    orderTotalPrice?: number;
    ordersStatus?: string;
    createdAt?: string;
    updatedAt?: string;
    user?: UserType;
    orderLines?: OrderLineType;
  }
  
  export interface CreationParams {
    denormalizedAddress?: string;
    orderTotalPrice?: number;
    ordersStatus?: string;
    createdAt?: string;
    updatedAt?: string;
    userId?: number;
    orderLines?: OrderLineType;
  }
  
  export type UpdateParams = Omit<OrderType, "orderId">;
  
  export interface CreationResponse {
    status: boolean;
    data: OrderType;
    message?: string;
  }
  
  export interface OrderResponse {
    status: boolean;
    data?: OrderType;
    message?: string;
  }
  
  export interface ListResponse {
    status: boolean;
    data: OrderType[];
    message?: string;
  }
  
  // export interface UserType {
  //   userId?: number;
  //   username?: string;
  //   email?: string;
  //   password?: string;
  // }
  

  
  export interface ProductVariationSizeType {
    productVariationSizeId?: number;
    // Add other properties as needed
  }
  