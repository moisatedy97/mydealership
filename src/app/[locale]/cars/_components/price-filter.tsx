"use client";

import { Slider } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { PriceRangeTypes } from "@/utils/constants";

export default function PriceFilter(): ReactElement {
  const setPrice = useCarFiltersStore((state) => state.setCarFilterPriceRange);

  const handleRangeChange = (values: number[]) => {
    console.log(values);

    setPrice({
      from: values[0],
      to: values[1],
    });
  };

  return (
    <Slider
      min={PriceRangeTypes.from!}
      max={PriceRangeTypes.to!}
      defaultValue={[PriceRangeTypes.from!, PriceRangeTypes.to!]}
      onValueCommit={handleRangeChange}
      className="w-48"
    />
  );
}
