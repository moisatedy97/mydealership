"use client";

import { Slider } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { useTranslations } from "next-intl";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { KmPerLiterHighwayRangeTypes } from "@/utils/constants";

export default function KmPerLiterHighwayFilter(): ReactElement {
  const t = useTranslations("cars");
  const { kmPerLiterHighway, setKmPerLiterHighway } = useCarFiltersStore((state) => ({
    kmPerLiterHighway: state.carFilters?.kmPerLiterHighway,
    setKmPerLiterHighway: state.setCarFilterKmPerLiterHighwayRange,
  }));

  const handleRangeChange = (values: number[]) => {
    setKmPerLiterHighway({
      from: values[0],
      to: values[1],
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div>{`${t("km_per_liter_highway")} ${kmPerLiterHighway ? kmPerLiterHighway.from : KmPerLiterHighwayRangeTypes.from} - ${kmPerLiterHighway ? kmPerLiterHighway.to : KmPerLiterHighwayRangeTypes.to}`}</div>
      <Slider
        min={KmPerLiterHighwayRangeTypes.from}
        max={KmPerLiterHighwayRangeTypes.to}
        defaultValue={[KmPerLiterHighwayRangeTypes.from, KmPerLiterHighwayRangeTypes.to]}
        onValueCommit={handleRangeChange}
        className="w-full"
        step={0.1}
      />
    </div>
  );
}
