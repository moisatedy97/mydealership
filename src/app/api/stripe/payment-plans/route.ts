import { Stripe } from "stripe";

export type StripePaymentPlan = Stripe.Price & { product: Stripe.Product };

export async function GET(): Promise<Response> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const { data } = await stripe.prices.list({
    expand: ["data.product"],
  });

  return Response.json(data);
}
