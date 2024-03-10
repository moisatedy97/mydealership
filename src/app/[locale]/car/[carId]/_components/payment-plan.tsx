import { Button } from "@radix-ui/themes";
import axios, { AxiosResponse } from "axios";
import { ReactElement, useState } from "react";
import Stripe from "stripe";
import { StripePaymentPlan } from "@/app/api/stripe/payment-plans/route";
import { StripeCheckoutData } from "@/interfaces/stripe-checkout-data";
import { useUserSessionStore } from "@/stores/session-store";
import getStripe from "@/stripe/config";
import { supabaseFn } from "@/utils/supabase-functions";
import { Tables } from "../../../../../../types/database.types";

type PaymentPlanProps = {
  car: Tables<"Car">;
  carOrder: Tables<"CarOrder"> | null;
  paymentPlan: StripePaymentPlan;
};

const PaymentPlan = ({ car, carOrder, paymentPlan }: PaymentPlanProps): ReactElement => {
  const user = useUserSessionStore((state) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newCarOrder, setNewCarOrder] = useState<Tables<"CarOrder"> | null>(null);

  const handleBuyPlan = async () => {
    let result;

    if (carOrder) {
      const fieldsToUpdate: Partial<Tables<"CarOrder">> = {
        status: "open",
        plan: paymentPlan.product.name,
        price: paymentPlan.unit_amount! / 100,
        expiredAt: null,
        updatedAt: new Date().toISOString(),
      };

      result = await supabaseFn.carOrder.update(fieldsToUpdate, car.carId, user!.id);
    } else {
      const newCarOrder: { carId: number; userId: string; price: number } & Partial<Tables<"CarOrder">> = {
        carId: car.carId,
        userId: user!.id,
        plan: paymentPlan.product.name,
        price: paymentPlan.unit_amount! / 100,
        expiredAt: null,
      };

      result = await supabaseFn.carOrder.create(newCarOrder);
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
};

export default PaymentPlan;
