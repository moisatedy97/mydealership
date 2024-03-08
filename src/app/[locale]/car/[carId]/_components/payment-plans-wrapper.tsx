"use client";

import { parseISO } from "date-fns";
import { ReactElement } from "react";
import useCarOrders from "@/hooks/use-car-orders";
import PaymentPlans from "./payment-plans";
import { Tables } from "../../../../../../types/database.types";

export default function PaymentPlansWrapper({ car }: { car: Tables<"Car"> }): ReactElement | undefined {
  const carOrder = useCarOrders(car.carId);

  if (carOrder && carOrder.length > 0) {
    if (carOrder[0].expiredAt && parseISO(carOrder[0].expiredAt) > new Date()) {
      return (
        <div>
          You already have a car order for this car. Go in the proflie page to see the details and complete the payment.
        </div>
      );
    } else {
      return <PaymentPlans car={car} carOrder={carOrder[0]} />;
    }
  } else {
    return <PaymentPlans car={car} carOrder={null} />;
  }
}
