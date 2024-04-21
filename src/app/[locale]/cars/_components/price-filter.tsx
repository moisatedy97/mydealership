"use client";

import { Slider } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { PriceRangeTypes } from "@/utils/constants";

export default function PriceFilter(): ReactElement {
  const t = useTranslations("cars");
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
    <div className="flex flex-col gap-1">
      <div>{`${t("price")} ${price ? price.from : PriceRangeTypes.from} - ${price ? price.to : PriceRangeTypes.to}`}</div>
      <Slider
        min={PriceRangeTypes.from}
        max={PriceRangeTypes.to}
        defaultValue={[PriceRangeTypes.from, PriceRangeTypes.to]}
        onValueCommit={handleRangeChange}
        className="w-full"
        step={1000}
      />
    </div>
  );
}
