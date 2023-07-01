import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  ProductVariationResponse,
  QueryProductVariationParams,
  UpdateParams,
} from "@/types/productVariation";

class Product extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(params: QueryProductVariationParams): Promise<ListResponse> {
    return await this.instance.get("/products", { params });
  }

  async detail(id: number): Promise<ProductVariationResponse> {
    return await this.instance.get(`/products/${id}`);
  }
  
  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/products", params);
  }

  async update(id: number, params: UpdateParams): Promise<ProductVariationResponse> {
    return await this.instance.put(`/products/${id}`, params);
  }

  async delete(id: number): Promise<void> {
    this.instance.delete(`/products/${id}`);
  }

  deleteAll(ids: number[]): void {
    this.instance.delete(`/products/${ids.join(",")}`);
  }
}

export default Product;
