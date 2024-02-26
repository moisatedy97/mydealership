"use client";

import { Button } from "@radix-ui/themes";
import axios from "axios";
import { ReactElement } from "react";
import Stripe from "stripe";

type ButtonProps = {
  products: Stripe.Product[];
};

const BuyPlan = ({ products }: ButtonProps): ReactElement => {
  const handleBuyPlanClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const product = products.find((product) => product.id === event.currentTarget.value);
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/checkout`, {
      ...product,
    });

    window.location.assign(data);
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
