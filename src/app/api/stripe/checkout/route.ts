import Stripe from "stripe";
import { QueryData } from "@supabase/supabase-js";
import { StripeCheckoutData } from "@/interfaces/stripe-checkout-data";
import supabaseServer from "@/supabase/config";
import { Tables } from "../../../../../types/database.types";

export const POST = async (req: Request) => {
  const reqData: StripeCheckoutData = await req.json();
  const referer: string = req.headers.get("referer") as string;

  const carOrder: Tables<"CarOrder">[] | null = await createCarOrder(reqData, referer);

  if (carOrder && carOrder.length > 0) {
    const stripeSession = await createStripeSession(reqData, referer);

    if (stripeSession.id) {
      const carPayment = await createPayment(carOrder[0], stripeSession, reqData);

      if (carPayment && carPayment.length > 0) {
        return Response.json(stripeSession, { status: 200 });
      } else {
        return Response.json({ error: "Error creating payment for car order." }, { status: 500 });
      }
    } else {
      return Response.json({ error: "Error creating stripe session" }, { status: 500 });
    }
  } else {
    return Response.json({ error: "Error creating car order." }, { status: 500 });
  }
};

const createCarOrder = async (reqData: StripeCheckoutData, referer: string): Promise<Tables<"CarOrder">[] | null> => {
  const carId: string = referer.split("/")[referer.split("/").length - 1];

  const query = supabaseServer()
    .from("CarOrder")
    .insert({
      carId: Number(carId),
      userId: reqData.userId,
      plan: reqData.paymentPlan.product.name,
      price: reqData.paymentPlan.unit_amount! / 100,
    })
    .select();
  const { data }: { data: QueryData<typeof query> | null } = await query;

  return data;
};

const createStripeSession = async (reqData: StripeCheckoutData, referer: string): Promise<Stripe.Checkout.Session> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: reqData.paymentPlan.product.default_price as string,
        quantity: 1,
      },
    ],
    customer_email: reqData.userEmail,
    success_url: referer,
    cancel_url: referer,
  });

  return session;
};

const createPayment = async (
  carOrder: Tables<"CarOrder">,
  stripeSession: Stripe.Checkout.Session,
  reqData: StripeCheckoutData,
): Promise<Tables<"Payment">[] | null> => {
  const query = supabaseServer()
    .from("Payment")
    .insert({
      carId: carOrder.carId,
      userId: carOrder.userId,
      sessionId: stripeSession.id,
      amount: reqData.paymentPlan.unit_amount! / 100,
      expiresAt: new Date(stripeSession.expires_at * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .select();
  const { data }: { data: QueryData<typeof query> | null } = await query;

  return data;
};
