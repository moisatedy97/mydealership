import { StripePaymentPlan } from "@/app/api/stripe/payment-plans/route";
import { Tables } from "../../types/database.types";

export type StripeCheckoutData = {
  carOrder: Tables<"CarOrder">;
  paymentPlan: StripePaymentPlan;
};
