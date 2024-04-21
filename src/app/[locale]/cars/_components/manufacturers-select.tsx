"use client";

import React, { ReactElement } from "react";
import { Select } from "@radix-ui/themes";
import { useTranslations } from "next-intl";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { Tables } from "../../../../../types/database.types";

type PropsManufacturersSelect = {
  manufacturers: Tables<"Manufacturer">[];
};

export default function ManufacturersSelect({ manufacturers }: PropsManufacturersSelect): ReactElement {
  const t = useTranslations("cars");
  const setManufacturer = useCarFiltersStore((state) => state.setCarFilterManufacturer);

  return (
    <Select.Root onValueChange={(value: string) => setManufacturer(Number(value))}>
      <Select.Trigger placeholder={t("manufacturer")} />
      <Select.Content>
        <Select.Group>
          <Select.Label>{t("manufacturer")}</Select.Label>
          {manufacturers.map((manufacturer: Tables<"Manufacturer">, index: number) => (
            <Select.Item key={index} value={manufacturer.manufacturerId.toString()}>
              {manufacturer.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
