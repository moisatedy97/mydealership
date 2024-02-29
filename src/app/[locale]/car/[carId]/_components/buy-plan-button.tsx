"use client";

import { Button } from "@radix-ui/themes";
import axios, { AxiosResponse } from "axios";
import { ReactElement, useState } from "react";
import Stripe from "stripe";
import getStripe from "@/stripe/config";

type ButtonProps = {
  products: Stripe.Product[];
};

const BuyPlan = ({ products }: ButtonProps): ReactElement => {
  const [stripeRes, setstripeRes] = useState(null);

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

      console.log(checkoutSession);

      if (status !== 200) {
        console.log(statusText);
      }

      const stripe = await getStripe();
      const response = await stripe!.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      console.log(response);

      // window.location.assign(checkoutSession.url as string);
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
      <pre>{JSON.stringify(stripeRes, null, 2)}</pre>
    </div>
  );
};

export default BuyPlan;
