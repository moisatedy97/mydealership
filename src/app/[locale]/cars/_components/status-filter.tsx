"use client";

import { Select } from "@radix-ui/themes";
import React from "react";
import { useTranslations } from "next-intl";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { StatusTypes } from "@/utils/constants";
import { Enums } from "../../../../../types/database.types";

export default function StatusFilter() {
  const t = useTranslations("cars");
  const setStatus = useCarFiltersStore((state) => state.setCarFilterStatus);

  return (
    <Select.Root onValueChange={(value: Enums<"car_status_type">) => setStatus(value)}>
      <Select.Trigger placeholder={t("status")} />
      <Select.Content>
        <Select.Group>
          <Select.Label>{t("status")}</Select.Label>
          {StatusTypes.map((status: Enums<"car_status_type">, index: number) => (
            <Select.Item key={index} value={status}>
              {status}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
