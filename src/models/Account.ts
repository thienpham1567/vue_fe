import type { LoginParams } from "@/types/user";
import { HTTPBaseService } from "@/utils/request";

class Account extends HTTPBaseService {
  public constructor() {
    super();
  }
  // async login(params: LoginParams): Promise<string> {
  //   const { data } = await this.instance.post("users/login", params);
  //   const token = data;
  //   return token;
  // }
  async login(params: LoginParams): Promise<string> {
    try {
      const response = await this.instance.post("users/login", params);
      const token = response.data;
      return token;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          const errorMessage = error.response.data;
        }
      }
      throw error;
    }
  }
}

export default Account;
