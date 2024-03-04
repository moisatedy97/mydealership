import React, { ReactElement } from "react";
import axios from "axios";
import { StripePaymentPlan } from "@/app/api/stripe/payment-plans/route";
import BuyPlan from "./buy-plan-button";

export default async function PaymentPlans(): Promise<ReactElement | undefined> {
  const { data }: { data: StripePaymentPlan[] } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/payment-plans`,
  );

  if (data && data.length > 0) {
    return <BuyPlan paymentPlans={data} />;
  }
}
