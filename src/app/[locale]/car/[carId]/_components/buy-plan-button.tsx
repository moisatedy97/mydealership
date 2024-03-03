"use client";

import { Button } from "@radix-ui/themes";
import axios, { AxiosResponse } from "axios";
import { ReactElement } from "react";
import Stripe from "stripe";
import getStripe from "@/stripe/config";
import { useUserSessionStore } from "@/stores/session-store";
import { StripeCheckoutData } from "@/interfaces/stripe-checkout-data";

type ButtonProps = {
  paymentPlans: Stripe.Product[];
};

const BuyPlan = ({ paymentPlans }: ButtonProps): ReactElement => {
  const user = useUserSessionStore((state) => state.user);

  //TODO: handle errors
  const handleBuyPlanClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (user) {
      const paymentPlan = paymentPlans.find((paymentPlan) => paymentPlan.id === event.currentTarget.value);

      if (paymentPlan) {
        const stripeCheckoutData: StripeCheckoutData = {
          userId: user.id,
          userEmail: user.email ?? "",
          paymentPlan: paymentPlan,
        };
        const {
          data: checkoutSession,
          status,
          statusText,
        } = await axios.post<
          Stripe.Checkout.Session,
          AxiosResponse<Stripe.Checkout.Session, StripeCheckoutData>,
          StripeCheckoutData
        >(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/checkout`, stripeCheckoutData);

        if (status === 200) {
          const stripe = await getStripe();
          const { error } = await stripe!.redirectToCheckout({
            sessionId: checkoutSession.id,
          });

          if (error) {
            console.log("Redirect to checkout failed");
          }
        } else {
          console.log(`Error creating stripe session: ${statusText}`);
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {paymentPlans.map((paymentPlan) => {
        return (
          <Button key={paymentPlan.id} value={paymentPlan.id} onClick={handleBuyPlanClick}>
            {paymentPlan.name}
          </Button>
        );
      })}
    </div>
  );
};

export default BuyPlan;
