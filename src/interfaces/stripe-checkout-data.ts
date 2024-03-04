import { StripePaymentPlan } from "@/app/api/stripe/payment-plans/route";

export type StripeCheckoutData = {
  userId: string;
  userEmail: string;
  paymentPlan: StripePaymentPlan;
};
