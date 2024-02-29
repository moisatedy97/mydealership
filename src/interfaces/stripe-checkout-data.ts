import Stripe from "stripe";

export type StripeCheckoutData = {
  userEmail: string;
  paymentPlan: Stripe.Product;
};
