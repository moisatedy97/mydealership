"use client";

import React, { ReactElement } from "react";
import { Select } from "@radix-ui/themes";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { Tables } from "../../../../../types/database.types";

type PropsManufacturersSelect = {
  manufacturers: Tables<"Manufacturer">[];
};

export default function ManufacturersSelect({ manufacturers }: PropsManufacturersSelect): ReactElement {
  const setManufacturer = useCarFiltersStore((state) => state.setCarFilterManufacturer);

  return (
    <Select.Root onValueChange={(value: string) => setManufacturer(Number(value))}>
      <Select.Trigger placeholder="Pick a manufacturer" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Manufacturers</Select.Label>
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
