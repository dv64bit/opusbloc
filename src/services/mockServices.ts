import type { KycStatus } from "../types";

const wait = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

export const TEST_OTP = "123456";

export const mockServices = {
  async sendMobileOtp(phone: string) {
    await wait();
    if (phone.endsWith("00000"))
      throw new Error("We could not send a code to this number. Try another number.");
    return { expiresIn: 45 };
  },
  async verifyOtp(code: string) {
    await wait();
    if (code !== TEST_OTP) throw new Error("That code is incorrect. Check the code and try again.");
    return { verified: true };
  },
  async sendEmailOtp(email: string) {
    await wait();
    if (email.toLowerCase() === "existing@opusbloc.demo") {
      throw new Error("This email is already connected to another account.");
    }
    return { expiresIn: 45 };
  },
  async validateReferral(code: string) {
    await wait(550);
    if (!["OPUS2025", "BLOC10"].includes(code.trim().toUpperCase())) {
      throw new Error("We could not recognise that referral. Check it and try again.");
    }
    return { valid: true };
  },
  async uploadDocument(file: File, onProgress: (progress: number) => void) {
    for (const progress of [18, 42, 68, 86, 100]) {
      await wait(250);
      onProgress(progress);
    }
    if (file.name.toLowerCase().includes("fail"))
      throw new Error("The upload was interrupted. Your PAN details are still saved.");
    return { uploaded: true, reference: `demo-${Date.now()}` };
  },
  async submitKyc(): Promise<{ status: KycStatus }> {
    await wait(900);
    return { status: "pending" };
  },
};
