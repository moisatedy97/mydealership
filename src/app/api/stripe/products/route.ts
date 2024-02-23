import { Stripe } from "stripe";

export async function GET() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const { data }: { data: Stripe.Product[] } = await stripe.products.list();

  return Response.json(data);
}
