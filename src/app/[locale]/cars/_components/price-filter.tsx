"use client";

import { Slider } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { PriceRangeTypes } from "@/utils/constants";

export default function PriceFilter(): ReactElement {
  const { price, setPrice } = useCarFiltersStore((state) => ({
    price: state.carFilters?.price,
    setPrice: state.setCarFilterPriceRange,
  }));

  const handleRangeChange = (values: number[]) => {
    setPrice({
      from: values[0],
      to: values[1],
    });
  };

  return (
    <div>
      <div>{`${price ? price.from : PriceRangeTypes.from} - ${price ? price.to : PriceRangeTypes.to}`}</div>
      <Slider
        min={PriceRangeTypes.from}
        max={PriceRangeTypes.to}
        defaultValue={[PriceRangeTypes.from, PriceRangeTypes.to]}
        onValueCommit={handleRangeChange}
        className="w-[30rem]"
        step={1000}
      />
    </div>
  );
}
