"use client";

import { Slider } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { KmRangeTypes } from "@/utils/constants";

export default function KmFilter(): ReactElement {
  const { km, setKm } = useCarFiltersStore((state) => ({
    km: state.carFilters?.km,
    setKm: state.setCarFilterKmRange,
  }));

  const handleRangeChange = (values: number[]) => {
    setKm({
      from: values[0],
      to: values[1],
    });
  };

  return (
    <div>
      <div>{`Km ${km ? km.from : KmRangeTypes.from} - ${km ? km.to : KmRangeTypes.to}`}</div>
      <Slider
        min={KmRangeTypes.from}
        max={KmRangeTypes.to}
        defaultValue={[KmRangeTypes.from, KmRangeTypes.to]}
        onValueCommit={handleRangeChange}
        className="w-full"
      />
    </div>
  );
}
