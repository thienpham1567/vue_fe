import { HTTPBaseService } from "@/utils/request";
import { PaymentInterface } from "@/types/paypal";
import type { CartType } from "@/types/cart";

class Payment extends HTTPBaseService implements PaymentInterface {
  constructor() {
    super();
  }

  async processPayment(cart: CartType): Promise<string> {
    try {
      const response = await this.instance.post("/payment/checkout", cart);
      return response.data;
    } catch (error) {
      throw new Error("Error processing payment: " + error.message);
    }
  }
}

export default Payment;
