import React, { ReactElement } from "react";
import axios from "axios";
import Stripe from "stripe";
import BuyPlan from "./buy-plan-button";

export default async function PaymentPlans(): Promise<ReactElement | undefined> {
  const { data }: { data: Stripe.Product[] } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/products`,
  );

  if (data && data.length > 0) {
    return <BuyPlan products={data} />;
  }
}
