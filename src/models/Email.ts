import { HTTPBaseService } from "@/utils/request";

class Email extends HTTPBaseService {
    public constructor() {
        super();
    }

    async sendEmail(email: String): Promise<void> {
        this.instance.post(`/email/send-email/${email}`);
    }
}

export default Email;
