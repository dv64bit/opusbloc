export type Route =
  | "intro"
  | "phone"
  | "phone-otp"
  | "email"
  | "email-otp"
  | "account-ready"
  | "referral"
  | "kyc-intro"
  | "pan"
  | "upload"
  | "preview"
  | "processing"
  | "biometric"
  | "home"
  | "market"
  | "activity"
  | "profile"
  | "security"
  | "property";

export type KycStatus = "pending" | "verified" | "action-required" | "rejected";

export interface AppState {
  mobileVerified: boolean;
  emailVerified: boolean;
  accountCreated: boolean;
  referralApplied: boolean;
  kycStatus: KycStatus | "not-started";
  biometricEnabled: boolean;
  onboardingCompleted: boolean;
}

export interface PanDetails {
  pan: string;
  name: string;
  dob: string;
}
