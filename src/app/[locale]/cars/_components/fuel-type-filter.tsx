"use client";

import { Select } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { FuelTypes } from "@/utils/constants";
import { Enums } from "../../../../../types/database.types";

export default function FuelTypeFilter(): ReactElement {
  const t = useTranslations("cars");
  const setFuelType = useCarFiltersStore((state) => state.setCarFilterFuelType);

  return (
    <Select.Root onValueChange={(value: Enums<"car_fuel_type">) => setFuelType(value)}>
      <Select.Trigger placeholder={t("fuel_type")} />
      <Select.Content>
        <Select.Group>
          <Select.Label>{t("fuel_type")}</Select.Label>
          {FuelTypes.map((fuelType: Enums<"car_fuel_type">, index: number) => (
            <Select.Item key={index} value={fuelType}>
              {fuelType}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
