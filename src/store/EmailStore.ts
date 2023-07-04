import Email from '@/models/Email'
import { defineStore } from "pinia";

const useEmailStore = defineStore("email", () => {
    const sendEmails = async (email: String) => {
        const emailInstance = new Email();
        await emailInstance.sendEmail(email);
    };

    return { sendEmails };
});

export default useEmailStore;
