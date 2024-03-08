import { Button } from "@radix-ui/themes";
import React, { ReactElement, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData, QueryError, User } from "@supabase/supabase-js";
import axios, { AxiosResponse } from "axios";
import Stripe from "stripe";
import { useUserSessionStore } from "@/stores/session-store";
import { StripeCheckoutData } from "@/interfaces/stripe-checkout-data";
import { StripePaymentPlan } from "@/app/api/stripe/payment-plans/route";
import getStripe from "@/stripe/config";
import { Database } from "../../../../../../types/supabase";
import { Tables } from "../../../../../../types/database.types";

type PaymentPlanProps = {
  car: Tables<"Car">;
  carOrder: Tables<"CarOrder"> | null;
  paymentPlan: StripePaymentPlan;
};

export default function PaymentPlan({ car, carOrder, paymentPlan }: PaymentPlanProps): ReactElement {
  const user = useUserSessionStore((state) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newCarOrder, setNewCarOrder] = useState<Tables<"CarOrder"> | null>(null);

  const handleBuyPlan = async () => {
    let result;

    console.log(carOrder);

    if (carOrder) {
      result = await updateOrder(car, user, paymentPlan);
    } else {
      result = await createOrder(car, user, paymentPlan);
    }

    if (result && result.length > 0) {
      console.log("OPEN MODAL");
      setNewCarOrder(result[0]);
      setIsOpen(true);
    }
  };

  const handleClickProfile = () => {
    console.log("GO TO PROFILE");
  };

  const handleBuyNow = async () => {
    if (user) {
      const stripeCheckoutData: StripeCheckoutData = {
        carOrder: newCarOrder!,
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
      >(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/create-checkout`, stripeCheckoutData);

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
    <div>
      <Button key={paymentPlan.id} value={paymentPlan.id} onClick={handleBuyPlan}>
        {paymentPlan.product.name}
      </Button>
      {isOpen && (
        <>
          <p>Car order created</p>
          <Button onClick={handleClickProfile}>Go to profile</Button>
          <Button onClick={handleBuyNow}>Buy now</Button>
        </>
      )}
    </div>
  );
}

const createOrder = async (
  car: Tables<"Car">,
  user: User | null,
  paymentPlan: StripePaymentPlan,
): Promise<Tables<"CarOrder">[] | null> => {
  console.log("CREATE ORDER");
  const supabase = createClientComponentClient<Database>();

  if (user) {
    const query = supabase
      .from("CarOrder")
      .insert({
        carId: car.carId,
        userId: user.id,
        plan: paymentPlan.product.name,
        price: paymentPlan.unit_amount! / 100,
        expiredAt: null,
      })
      .select();
    const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

    if (error) {
      console.log(error);
    }

    return data;
  }

  return null;
};

const updateOrder = async (
  car: Tables<"Car">,
  user: User | null,
  paymentPlan: StripePaymentPlan,
): Promise<Tables<"CarOrder">[] | null> => {
  console.log("UPDATE ORDER");
  const supabase = createClientComponentClient<Database>();

  if (user) {
    const query = supabase
      .from("CarOrder")
      .update({
        plan: paymentPlan.product.name,
        price: paymentPlan.unit_amount! / 100,
        status: "open",
        expiredAt: null,
        updatedAt: new Date().toISOString(),
      })
      .eq("userId", user.id)
      .eq("carId", car.carId)
      .select();
    const { data, error }: { data: QueryData<typeof query> | null; error: QueryError | null } = await query;

    if (error) {
      console.log(error);
    }

    return data;
  }

  return null;
};
