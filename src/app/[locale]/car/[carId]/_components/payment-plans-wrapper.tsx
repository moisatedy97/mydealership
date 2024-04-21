"use client";

import { parseISO } from "date-fns";
import { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { Callout, Link } from "@radix-ui/themes";
import useCarOrders from "@/hooks/use-car-orders";
import PaymentPlans from "./payment-plans";
import { Tables } from "../../../../../../types/database.types";

export default function PaymentPlansWrapper({ car }: { car: Tables<"Car"> }): ReactElement | undefined {
  const t = useTranslations("car");
  const carOrder = useCarOrders(car.carId);

  if (carOrder && carOrder.length > 0) {
    if (carOrder[0].expiredAt && parseISO(carOrder[0].expiredAt) > new Date()) {
      return (
        <Callout.Root className="mt-3" color="yellow">
          <Callout.Icon></Callout.Icon>
          <Callout.Text>{t("payment_plans.order_exists")}</Callout.Text>
          <Link href="/orders">{t("payment_plans.visit_orders")}</Link>
        </Callout.Root>
      );
    } else {
      return <PaymentPlans car={car} carOrder={carOrder[0]} />;
    }
  } else {
    return <PaymentPlans car={car} carOrder={null} />;
  }
}
