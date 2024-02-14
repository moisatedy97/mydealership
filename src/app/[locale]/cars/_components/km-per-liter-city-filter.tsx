"use client";

import { Slider } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { KmPerLiterCityRangeTypes } from "@/utils/constants";

export default function KmPerLiterCityFilter(): ReactElement {
  const { kmPerLiterCity, setKmPerLiterCity } = useCarFiltersStore((state) => ({
    kmPerLiterCity: state.carFilters?.kmPerLiterCity,
    setKmPerLiterCity: state.setCarFilterKmPerLiterCityRange,
  }));

  const handleRangeChange = (values: number[]) => {
    setKmPerLiterCity({
      from: values[0],
      to: values[1],
    });
  };

  return (
    <div>
      <div>{`KmPerLiterCity ${kmPerLiterCity ? kmPerLiterCity.from : KmPerLiterCityRangeTypes.from} - ${kmPerLiterCity ? kmPerLiterCity.to : KmPerLiterCityRangeTypes.to}`}</div>
      <Slider
        min={KmPerLiterCityRangeTypes.from}
        max={KmPerLiterCityRangeTypes.to}
        defaultValue={[KmPerLiterCityRangeTypes.from, KmPerLiterCityRangeTypes.to]}
        onValueCommit={handleRangeChange}
        className="w-[30rem]"
        step={0.1}
      />
    </div>
  );
}
