import { buffer } from "stream/consumers";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: any) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const signature = headers().get("stripe-signature");
    const event: Stripe.Event = stripe.webhooks.constructEvent(await buffer(req.body), signature!, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSession = event.data.object;
        console.log("Checkout session completed!", checkoutSession);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error: any) {
    return Response.json({ error: `Webhook Error: ${error?.message}` }, { status: 400 });
  }

  return Response.json({ received: true });
}
