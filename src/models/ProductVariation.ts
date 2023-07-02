import { HTTPBaseService } from "@/utils/request";
import type {
  CreationParams,
  CreationResponse,
  ListResponse,
  ProductVariationResponse,
  QueryProductVariationParams,
  UpdateParams,
} from "@/types/productVariation";


class ProductVariation extends HTTPBaseService {
  public constructor() {
    super();
  }

  async list(params: QueryProductVariationParams): Promise<ListResponse> {
    return await this.instance.get("/admin/productVariations", { params });
  }

  async detail(id: number): Promise<ProductVariationResponse> {
    return await this.instance.get(`/products/${id}`);
  }

  async create(params: CreationParams): Promise<CreationResponse> {
    return await this.instance.post("/admin/productVariations", params);
  }

  async update(id: number, params: UpdateAdminParams): Promise<ProductResponse> {
    return await this.instance.put(`/admin/products/${id}`, params);
  }

  async delete(id: number): Promise<void> {
    await this.instance.delete(`/admin/productVariations/${id}`);
  }

  deleteAll(ids: number[]): void {
    this.instance.delete(`/products/${ids.join(",")}`);
  }
}

export default ProductVariation;
