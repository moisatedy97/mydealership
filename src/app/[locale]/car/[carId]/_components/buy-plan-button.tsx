"use client";

import { Button } from "@radix-ui/themes";
import axios, { AxiosResponse } from "axios";
import { ReactElement } from "react";
import Stripe from "stripe";
import getStripe from "@/stripe/config";

type ButtonProps = {
  products: Stripe.Product[];
};

const BuyPlan = ({ products }: ButtonProps): ReactElement => {
  const handleBuyPlanClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const product = products.find((product) => product.id === event.currentTarget.value);

    if (product) {
      const {
        data: checkoutSession,
        status,
        statusText,
      } = await axios.post<
        Stripe.Checkout.Session,
        AxiosResponse<Stripe.Checkout.Session, Stripe.Product>,
        Stripe.Product
      >(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/checkout`, product);

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
  };

  return (
    <div className="flex flex-col gap-2">
      {products.map((product) => {
        return (
          <Button key={product.id} value={product.id} onClick={handleBuyPlanClick}>
            {product.name}
          </Button>
        );
      })}
    </div>
  );
};

export default BuyPlan;
