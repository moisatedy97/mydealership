"use client";

import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { StripePaymentPlan } from "@/app/api/stripe/payment-plans/route";
import PaymentPlan from "./payment-plan";

export default function PaymentPlans(): ReactElement | undefined {
  const [paymentPlans, setPaymentPlans] = useState<StripePaymentPlan[]>([]);

  const getPaymentPlans = async () => {
    const { data }: { data: StripePaymentPlan[] } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/payment-plans`,
    );

    if (data && data.length > 0) {
      setPaymentPlans(data);
    }
  };

  useEffect(() => {
    getPaymentPlans();
  }, []);

  if (paymentPlans.length > 0) {
    return (
      <div>
        {paymentPlans.map((paymentPlan, index) => {
          return <PaymentPlan key={index} paymentPlan={paymentPlan} />;
        })}
      </div>
    );
  }
}
