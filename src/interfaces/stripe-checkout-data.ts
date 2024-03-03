import Stripe from "stripe";

export type StripeCheckoutData = {
  userId: string;
  userEmail: string;
  paymentPlan: Stripe.Product;
};
