import Stripe from "stripe";
import { QueryData, QueryError } from "@supabase/supabase-js";
import { StripeCheckoutData } from "@/interfaces/stripe-checkout-data";
import supabaseServer from "@/supabase/config";
import { Tables } from "../../../../../types/database.types";

export const POST = async (req: Request) => {
  const reqData: StripeCheckoutData = await req.json();
  const referer: string = req.headers.get("referer") as string;

  const stripeSession = await createStripeSession(reqData, referer);

  if (stripeSession.id) {
    const carPayment = await createPayment(stripeSession, reqData);

    if (carPayment && carPayment.length > 0) {
      const carOrder = await updateCarOrder(stripeSession, reqData);

      if (carOrder && carOrder.length > 0) {
        return Response.json(stripeSession, { status: 200 });
      }
    }
  }

  return Response.json({ error: "Error creating stripe session" }, { status: 500 });
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
    success_url: referer,
    cancel_url: referer,
  });

  return session;
};

const createPayment = async (
  stripeSession: Stripe.Checkout.Session,
  reqData: StripeCheckoutData,
): Promise<Tables<"Payment">[] | null> => {
  const query = supabaseServer()
    .from("Payment")
    .insert({
      carId: reqData.carOrder.carId,
      userId: reqData.carOrder.userId,
      sessionId: stripeSession.id,
      amount: reqData.paymentPlan.unit_amount! / 100,
      expiredAt: new Date(stripeSession.expires_at * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .select();
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  if (error) {
    console.log(error);
  }

  return data;
};

const updateCarOrder = async (
  stripeSession: Stripe.Checkout.Session,
  reqData: StripeCheckoutData,
): Promise<Tables<"CarOrder">[] | null> => {
  const query = supabaseServer()
    .from("CarOrder")
    .update({
      sessionId: stripeSession.id,
      expiredAt: new Date(stripeSession.expires_at * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .eq("userId", reqData.carOrder.userId)
    .eq("carId", reqData.carOrder.carId)
    .select();
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  if (error) {
    console.log(error);
  }

  return data;
};
