"use client";

import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { StripePaymentPlan } from "@/app/api/stripe/payment-plans/route";
import PaymentPlan from "./payment-plan";
import { Tables } from "../../../../../../types/database.types";

type PaymentPlansProps = {
  car: Tables<"Car">;
  carOrder: Tables<"CarOrder"> | null;
};

export default function PaymentPlans({ car, carOrder }: PaymentPlansProps): ReactElement | undefined {
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
          return <PaymentPlan key={index} car={car} carOrder={carOrder} paymentPlan={paymentPlan} />;
        })}
      </div>
    );
  }
}
