import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  if (req.body) {
    try {
      const signature = headers().get("stripe-signature");
      const bodyBuffer = await req.text();
      const event: Stripe.Event = stripe.webhooks.constructEvent(bodyBuffer, signature!, webhookSecret);

      switch (event.type) {
        case "checkout.session.completed":
          const checkoutSession = event.data.object;
          console.log("Checkout session completed!", checkoutSession);
          break;
        default:
          return Response.json({ error: `Unhandled event type ${event.type}` }, { status: 400 });
      }
    } catch (error) {
      return Response.json({ error: `Webhook Error: ${error}` }, { status: 400 });
    }
  }

  return Response.json({ received: true });
}
