"use client";

import { Select } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { EngineTypes } from "@/utils/constants";
import { Enums } from "../../../../../types/database.types";

export default function EngineTypeFilter(): ReactElement {
  const t = useTranslations("cars");
  const setEngineType = useCarFiltersStore((state) => state.setCarFilterEngineType);

  return (
    <Select.Root onValueChange={(value: Enums<"car_engine_type">) => setEngineType(value)}>
      <Select.Trigger placeholder={t("engine_type")} />
      <Select.Content>
        <Select.Group>
          <Select.Label>{t("engine_type")}</Select.Label>
          {EngineTypes.map((engineType: Enums<"car_engine_type">, index: number) => (
            <Select.Item key={index} value={engineType}>
              {engineType}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
