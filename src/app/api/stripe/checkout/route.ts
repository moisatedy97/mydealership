import Stripe from "stripe";
import { QueryError } from "@supabase/supabase-js";
import { StripeCheckoutData } from "@/interfaces/stripe-checkout-data";
import supabaseServer from "@/supabase/config";

export const POST = async (req: Request) => {
  const reqData: StripeCheckoutData = await req.json();
  const referer: string = req.headers.get("referer") as string;
  const carId: string = referer.split("/")[referer.split("/").length - 1];
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: reqData.paymentPlan.default_price as string,
        quantity: 1,
      },
    ],
    customer_email: reqData.userEmail,
    success_url: referer,
    cancel_url: referer,
  });

  if (session.id) {
    const query = supabaseServer()
      .from("CarOrder")
      .insert({
        stripeSessionId: session.id,
        carId: Number(carId),
        userId: reqData.userId,
        plan: reqData.paymentPlan.name,
      })
      .select();
    const { error }: { error: QueryError | null } = await query;

    if (error) {
      return Response.json({ error: "Error creating stripe session" }, { status: 500 });
    }

    return Response.json(session, { status: 200 });
  }

  return Response.json({ error: "Error creating stripe session" }, { status: 500 });
};
