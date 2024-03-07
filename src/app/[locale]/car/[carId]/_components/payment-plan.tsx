import { Button } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { StripePaymentPlan } from "@/app/api/stripe/payment-plans/route";

export default function PaymentPlan({ paymentPlan }: { paymentPlan: StripePaymentPlan }): ReactElement {
  const handleBuyPlan = () => {
    console.log("OPEN MODAL");
  };

  return (
    <Button key={paymentPlan.id} value={paymentPlan.id} onClick={handleBuyPlan}>
      {paymentPlan.product.name}
    </Button>
  );
}
