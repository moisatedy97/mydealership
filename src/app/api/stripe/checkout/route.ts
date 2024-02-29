import Stripe from "stripe";

export const POST = async (req: Request) => {
  const product: Stripe.Product = await req.json();
  const referer: string = req.headers.get("referer") as string;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: product.default_price as string,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: referer,
    cancel_url: referer,
  });

  if (session.id) {
    return Response.json(session, { status: 200 });
  }

  return Response.json({ error: "Error creating stripe session" }, { status: 500 });
};
