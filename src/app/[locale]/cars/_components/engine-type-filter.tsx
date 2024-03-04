"use client";

import { Select } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { EngineTypes } from "@/utils/constants";
import { Enums } from "../../../../../types/database.types";

export default function EngineTypeFilter(): ReactElement {
  const setEngineType = useCarFiltersStore((state) => state.setCarFilterEngineType);

  return (
    <Select.Root onValueChange={(value: Enums<"car_engine_type">) => setEngineType(value)}>
      <Select.Trigger placeholder="Pick a engine type" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Manufacturers</Select.Label>
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
