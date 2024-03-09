import Stripe from "stripe";
import { QueryData, QueryError } from "@supabase/supabase-js";
import supabaseServer from "@/supabase/config";
import { Tables } from "../../../../../types/database.types";

export const POST = async (req: Request) => {
  const reqData: { carOrder: Tables<"CarOrder"> } = await req.json();

  const stripeSession = await retrieveStripeSession(reqData);

  if (stripeSession.id) {
    const carPayment = await updatePayment(stripeSession);

    if (carPayment && carPayment.length > 0) {
      const carOrder = await updateCarOrder(stripeSession);

      if (carOrder && carOrder.length > 0) {
        return Response.json(stripeSession, { status: 200 });
      }
    }
  }

  return Response.json({ error: "Error retrieving stripe session" }, { status: 500 });
};

const retrieveStripeSession = async (reqData: { carOrder: Tables<"CarOrder"> }): Promise<Stripe.Checkout.Session> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session: Stripe.Checkout.Session = await stripe.checkout.sessions.retrieve(reqData.carOrder.sessionId);

  return session;
};

const updatePayment = async (stripeSession: Stripe.Checkout.Session): Promise<Tables<"Payment">[] | null> => {
  const query = supabaseServer()
    .from("Payment")
    .update({
      expiredAt: new Date(stripeSession.expires_at * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .eq("sessionId", stripeSession.id)
    .select();
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  if (error) {
    console.log(error);
  }

  return data;
};

const updateCarOrder = async (stripeSession: Stripe.Checkout.Session): Promise<Tables<"CarOrder">[] | null> => {
  const query = supabaseServer()
    .from("CarOrder")
    .update({
      expiredAt: new Date(stripeSession.expires_at * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .eq("sessionId", stripeSession.id)
    .select();
  const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

  if (error) {
    console.log(error);
  }

  return data;
};
