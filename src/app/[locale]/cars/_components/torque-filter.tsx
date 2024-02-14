"use client";

import { Slider } from "@radix-ui/themes";
import React, { ReactElement } from "react";
import { useCarFiltersStore } from "@/stores/car-filters-store";
import { TorqueRangeTypes } from "@/utils/constants";

export default function TorqueFilter(): ReactElement {
  const { torque, setTorque } = useCarFiltersStore((state) => ({
    torque: state.carFilters?.torque,
    setTorque: state.setCarFilterTorqueRange,
  }));

  const handleRangeChange = (values: number[]) => {
    setTorque({
      from: values[0],
      to: values[1],
    });
  };

  return (
    <div>
      <div>{`Torque ${torque ? torque.from : TorqueRangeTypes.from} - ${torque ? torque.to : TorqueRangeTypes.to}`}</div>
      <Slider
        min={TorqueRangeTypes.from}
        max={TorqueRangeTypes.to}
        defaultValue={[TorqueRangeTypes.from, TorqueRangeTypes.to]}
        onValueCommit={handleRangeChange}
        className="w-[30rem]"
      />
    </div>
  );
}
