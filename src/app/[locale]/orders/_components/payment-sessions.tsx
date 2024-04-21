"use client";

import { ReactElement } from "react";
import { Table } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import useCarOrders from "@/hooks/use-car-orders";
import CarOrder from "./car-order";

export default function PaymentSessions(): ReactElement {
  const carOrders = useCarOrders();
  const t = useTranslations("orders");

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>{t("payments.car_name")}</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>{t("payments.plan")}</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>{t("payments.status")}</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>{t("payments.actions")}</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {carOrders.map((carOrder, index) => (
          <CarOrder key={index} carOrder={carOrder} />
        ))}
      </Table.Body>
    </Table.Root>
  );
}
