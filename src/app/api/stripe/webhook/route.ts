import { PostgrestSingleResponse, QueryError } from "@supabase/supabase-js";
import { headers } from "next/headers";
import Stripe from "stripe";
import supabaseServer from "@/supabase/config";
import { Tables } from "../../../../../types/database.types";

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
          let error: QueryError | null = null;

          error = (await updatePayment(checkoutSession)).error;

          if (error) {
            return Response.json({ error: error.message }, { status: 500 });
          }

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

const updatePayment = async (
  stripeSession: Stripe.Checkout.Session,
): Promise<PostgrestSingleResponse<Tables<"Payment">[]>> => {
  const query = supabaseServer()
    .from("Payment")
    .update({
      method: stripeSession.payment_method_types[0],
      status: stripeSession.payment_status,
      updatedAt: new Date().toISOString(),
      expiresAt: new Date(stripeSession.expires_at * 1000).toISOString(),
      currency: stripeSession.currency ?? "",
      country: "",
      phone: "",
    })
    .eq("sessionId", stripeSession.id)
    .select();

  return await query;
};

// const updateCarOrder = async (
//   stripeSession: Stripe.Checkout.Session,
// ): Promise<PostgrestSingleResponse<Tables<"CarOrder">[]>> => {
//   const query = supabaseServer()
//     .from("CarOrder")
//     .update({
//       method: stripeSession.payment_method_types[0],
//       status: stripeSession.payment_status,
//       updatedAt: new Date().toISOString(),
//       expiresAt: new Date(stripeSession.expires_at * 1000).toISOString(),
//       currency: stripeSession.currency ?? "",
//       country: "",
//       phone: "",
//     })
//     .eq("sessionId", stripeSession.id)
//     .select();

//   return await query;
// };
