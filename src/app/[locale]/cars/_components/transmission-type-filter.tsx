"use client";

import { Select } from "@radix-ui/themes";
import React from "react";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { TransmissionTypes } from "@/utils/constants";
import { Enums } from "../../../../../types/database.types";

export default function TransmissionTypeFilter() {
  const setTransmissionType = useCarFiltersStore((state) => state.setCarFilterTransmissionType);

  return (
    <Select.Root onValueChange={(value: Enums<"car_transmission_type">) => setTransmissionType(value)}>
      <Select.Trigger placeholder="Pick a transmission type" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Transmission</Select.Label>
          {TransmissionTypes.map((transmissionType: Enums<"car_transmission_type">, index: number) => (
            <Select.Item key={index} value={transmissionType}>
              {transmissionType}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
