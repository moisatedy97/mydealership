"use client";

import { ReactElement } from "react";
import useCarOrders from "@/hooks/use-car-orders";
import CarOrder from "./car-order";

export default function PaymentSessions(): ReactElement {
  const carOrders = useCarOrders();

  return (
    <div className="flex flex-col gap-4">
      {carOrders.map((carOrder, index) => {
        return <CarOrder key={index} carOrder={carOrder} />;
      })}
    </div>
  );
}
