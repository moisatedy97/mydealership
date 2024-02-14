"use client";

import { Slider } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { KmPerLiterHighwayRangeTypes } from "@/utils/constants";

export default function KmPerLiterHighwayFilter(): ReactElement {
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
    <div>
      <div>{`KmPerLiterHighway ${kmPerLiterHighway ? kmPerLiterHighway.from : KmPerLiterHighwayRangeTypes.from} - ${kmPerLiterHighway ? kmPerLiterHighway.to : KmPerLiterHighwayRangeTypes.to}`}</div>
      <Slider
        min={KmPerLiterHighwayRangeTypes.from}
        max={KmPerLiterHighwayRangeTypes.to}
        defaultValue={[KmPerLiterHighwayRangeTypes.from, KmPerLiterHighwayRangeTypes.to]}
        onValueCommit={handleRangeChange}
        className="w-[30rem]"
        step={0.1}
      />
    </div>
  );
}
