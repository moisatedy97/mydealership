import Stripe from "stripe";

export const POST = async (req: Request) => {
  const product: Stripe.Product = await req.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: product.default_price as string,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  if (session.id) {
    return new Response(session.url);
  }

  return Response.json({ error: "Error creating session" }, { status: 500 });
};
